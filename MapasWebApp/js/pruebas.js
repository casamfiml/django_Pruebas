$(document).on("submit", "#CalcularFWA", function(e) {
    e.preventDefault();
    var self = $(this),
        url = self.attr("action"),
        ajax_req = $.ajax({
            url: url,
            type: "POST",
            data: {
                name: self.find("#resultado").val()
            },
            success: function(data, textStatus, jqXHR) {
                django_message("Pony saved successfully.", "success");
            },
            error: function(data, textStatus, jqXHR) {
                var errors = $.parseJSON(data.responseText);
                $.each(errors, function(index, value) {
                    if (index === "__all__") {
                        django_message(value[0], "error");
                    } else {
                        apply_form_field_error(index, value);
                    }
                });
            }
        });
});