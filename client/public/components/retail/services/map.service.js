retail
    .factory('Map', function($resource) {
        return $resource(
            'https://django-fwa-casamfiml.c9users.io:8081/maps/:id/',
            {},
            {
                'query': {
                    method: 'GET',
                    dataType: 'jsonp',
                    isArray: true,
                    headers: {
                        'Content-Type':'application/json'
                    }
                }
            },
            {
                stripTrailingSlashes: false
            }
        );
    });