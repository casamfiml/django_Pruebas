retail
    .factory('Employee', function($resource) {
        return $resource(
            'https://django-fwa-casamfiml.c9users.io:8081/employees/:id/',
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