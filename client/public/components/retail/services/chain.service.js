retail
    .factory('Chain', function($resource) {
        return $resource(
            'https://django-fwa-casamfiml.c9users.io:8081/chains/:id/',
            {},
            {
                'query_get': {
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