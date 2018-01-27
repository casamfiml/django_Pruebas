from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
#from .Layer import COBERTURA_FWA
from django.db.models import Sum
import os
import pandas as pd
import numpy as np
from fiona.crs import from_epsg
import shapefile
from geopandas.tools import sjoin
import shutil
import geopandas
import math
import codecs
from django_pandas.managers import DataFrameManager

class Chain(models.Model):
    """ High-level retail chain model"""
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    slogan = models.CharField(max_length=500)
    founded_date = models.CharField(max_length=500)
    website = models.URLField(max_length=500)


class Store(models.Model):
    """ Store location model.  Foreign key to Chain."""
    chain = models.ForeignKey(Chain,on_delete=models.CASCADE)
    number = models.CharField(max_length=20)
    address = models.CharField(max_length=1000)
    opening_date = models.DateTimeField(default=timezone.now)

    # Business hours in a 24 hour clock.  Default 8am-5pm.
    business_hours_start = models.IntegerField(
        default=8,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(23)
        ]
    )
    business_hours_end = models.IntegerField(
        default=17,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(23)
        ]
    )


class Employee(models.Model):
    """ Location employee model.  Foreign key to Store."""
    store = models.ForeignKey(Store,on_delete=models.CASCADE,)
    number = models.CharField(max_length=20)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    hired_date = models.DateTimeField(default=timezone.now)
    
class Map(models.Model):
    #Mapa = Map
    latitud = models.FloatField(null=False)
    longitud = models.FloatField(null=False)
    radio = models.IntegerField(default=1)
    #respuesta = models.CharField(max_length=10)
    #respuesta = COBERTURA_FWA.DispFWA(models.FloatField().to_python(longitud),models.FloatField().to_python(latitud))
    #@property
    #def _get_function(self):
    #    return ''.join([str(self.latitud),"   ",str(self.longitud)])
    #@property
    #@property
    def DispFWA(self):
        s=int(np.random.uniform(1,100000,1))
        dir="[Ligar en donde se guardan los archivos temporales]"+str(s)
        #if os.path.exists(dir)==True:
        #    s=int(np.random.uniform(1,100000,1))
        #    dir=os.getcwd()+"_"+str(s)
        #    os.makedirs("_"+str(s))
        #else :
            #os.makedirs("_"+str(s))
    #d = {'lon': [-0.177158], 'lat': [-78.464717]}
    #lon=-0.179529
    #lat=-78.480649
        trees_shp = shapefile.Writer(shapefile.POINT)
        trees_shp.autoBalance = 1
        trees_shp.field("ID", "C")
        trees_shp.field("LATITUD", "C")
        trees_shp.field("LONGITUD", "C")
        ID=1
        #LATITUD= str(self.latitud)
        #LONGITUD= str(self.longitud)
        LATITUD = ''.join(str(self.longitud))
        LONGITUD = ''.join(str(self.latitud))
        trees_shp.point(float(LONGITUD),float(LATITUD))
        trees_shp.record(ID,float(LONGITUD),float(LATITUD))
        trees_shp.save(dir+"/punto_"+str(s))
        point = geopandas.GeoDataFrame.from_file(dir+"/punto_"+str(s)+".shp")
        point.crs = from_epsg(4326)
        point = point.to_crs({'init': 'epsg:4326'}) 
        #poly  = geopandas.GeoDataFrame.from_file('LTE_Coverage_py.shp')
        poly  = geopandas.GeoDataFrame.from_file('[Layer de Disponibilidad de ]')
        poly.crs = from_epsg(4326)
        poly = poly.to_crs({'init': 'epsg:4326'})
        pointInPolys = sjoin(point, poly, how='left')
        #Algunos puntos dan error, se necesita corrección
        if pointInPolys['COLOR'][0] == '0 255 0':
            return("Disponible :)")
        else:
            return("No Disponible :(")
#    @property
    def EmprFWA(self):
        pi=math.pi
        d={'LONGITUD': [self.latitud], 'LATITUD': [self.longitud]}
        #d={'LONGITUD':[-78.478938],'LATITUD':[-0.176964]}
        dat = pd.DataFrame(data=d)
        dot=pd.read_csv('/home/ubuntu/workspace/gigfinder/retail/Empresas/LugaresLimpiosEcuador.csv',sep=',', encoding = 'ISO-8859-1')
        dot['amenity'][dot.amenity.isnull()]=''
        ## Cruzar cada punto contra todos los puntos
        dot['lat_r']=(dot['latitud']*pi)/180
        dot['lon_r']=(dot['longitud']*pi)/180
        #dot['result']=np.nan
        lon1=(dat['LONGITUD'][0]*pi)/180 #Grados decimales a radians
        lat1=(dat['LATITUD'][0]*pi)/180
        dot['dlon']= dot['lon_r'] - lon1 
        dot['dlat']= dot['lat_r'] - lat1 
        dot['a']=np.double((np.sin(dot['dlat']/2))**2 + np.cos(lat1) * np.cos(dot['lat_r']) * (np.sin(dot['dlon']/2))**2)
        dot['result']=np.double((6373* 2 * np.arctan2(np.sqrt(dot['a']),np.sqrt(1-dot['a'])))*1000)
        #cob<-ifelse(is.na(dot$cob[[i]]),0,dot$cob[[i]])
        dot = dot.reset_index(drop=True)
        dot=dot[dot.result<=self.radio]
        #dot=dot[dot.result<=500]
        return dot
#        pi=math.pi
#         d={'LONGITUD': [str(self.longitud)], 'LATITUD': [str(self.latitud)]}
#         dat = pd.DataFrame(data=d)
#         dot=pd.read_csv('/home/ubuntu/workspace/gigfinder/retail/Layer/empresas_cruce.csv',sep='|', encoding = 'ISO-8859-1')
#         dot['amenity'][dot.amenity.isnull()]=''
#         ## Cruzar cada punto contra todos los puntos
#         dot['lat_r']=(dot['latitud']*pi)/180
#         dot['lon_r']=(dot['longitud']*pi)/180
#     #dot['result']=np.nan
#         lon1=(dat['LONGITUD'][0]*pi)/180 #Grados decimales a radians
#         lat1=(dat['LATITUD'][0]*pi)/180
#         dot['dlon']= dot['lon_r'] - lon1 
#         dot['dlat']= dot['lat_r'] - lat1 
#         dot['a']=np.double((np.sin(dot['dlat']/2))**2 + np.cos(lat1) * np.cos(dot['lat_r']) * (np.sin(dot['dlon']/2))**2)
#         dot['result']=np.double((6373* 2 * np.arctan2(np.sqrt(dot['a']),np.sqrt(1-dot['a'])))*1000)
#   #cob<-ifelse(is.na(dot$cob[[i]]),0,dot$cob[[i]])
#         dot = dot.reset_index(drop=True)
#         dot=dot[dot.result<=int(self.radio)]
#         return dot.head

    #num1 = models.DecimalField(max_digits=5,decimal_places=2)
#num2 = models.DecimalField(max_digits=5,decimal_places=2)
#resultado = models.DecimalField(max_digits=5,decimal_places=2)
#def save(self, *args,**kwargs):
#self.resultado = (self.num1/self.num2)
#super(Muestra, self).save(*args,**kwargs)
    #response = DispFWA
    
    # @property
    # def get_str_latitud(self):
    #     return self.latitud
        
    # @property
    # def get_str_longitud(self):
    #     doc = "The get_str_longitud property."
    #     def fget(self):
    #         return self._get_str_longitud
    #     def fset(self, value):
    #         self._get_str_longitud = value
    
    # @property
    # def _get_full_name(self):
    #     return ''.join([self.latitud.val(),self.longitud.val()])
    #     #return DispFWA(self.longitud,self.latitud)
    
    # def perro(self,uno,dos):
    #     return ''.join([uno,dos,self.longitud,self.latitud])
    
    # response = str(get_str_longitud(Mapa.longitud),get_str_latitud(Mapa.latitud))
    
