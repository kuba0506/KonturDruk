var konturDruk = function () {
/*
     ######  ##    ##  ######  ##       ########
    ##    ##  ##  ##  ##    ## ##       ##
    ##         ####   ##       ##       ##
    ##          ##    ##       ##       ######
    ##          ##    ##       ##       ##
    ##    ##    ##    ##    ## ##       ##
     ######     ##     ######  ######## ########
*/
    $('[data-cycle]').each(function() {
        var el = $(this),
            config = el.dataConfig('cycle', {log: false});
        el.cycle(config);
    });
/// =include lightbox.js
/*
    ########  ########   #######  ########  ########   #######  ##      ## ##    ##
    ##     ## ##     ## ##     ## ##     ## ##     ## ##     ## ##  ##  ## ###   ##
    ##     ## ##     ## ##     ## ##     ## ##     ## ##     ## ##  ##  ## ####  ##
    ##     ## ########  ##     ## ########  ##     ## ##     ## ##  ##  ## ## ## ##
    ##     ## ##   ##   ##     ## ##        ##     ## ##     ## ##  ##  ## ##  ####
    ##     ## ##    ##  ##     ## ##        ##     ## ##     ## ##  ##  ## ##   ###
    ########  ##     ##  #######  ##        ########   #######   ###  ###  ##    ##
*/
    (function() {
        var dropdowns = $('[data-dropdown]'),
            a = dropdowns.children('a'),
            open_class = 'dropdown--open',
            triangle = 'triangle',
            open = false,
            open_content = false,
            timer = null,
            timer_time = 350;

        if ($(window).width() < 768) {
            a.removeClass(triangle);

            dropdowns.on('click', function(event) {
                event.preventDefault();
                var link = $(this),
                    linkA = link.children('a'),
                    content = link.find('[data-dropdown-content]');
                if (event.type === 'click') {
                    if (!open) {
                        linkA.addClass(triangle);
                        link.addClass(open_class);
                        content.show();
                        open = link;
                        open_content = content;
                    } else {
                        if (open) {
                            linkA.removeClass(triangle);
                            open.removeClass(open_class);
                            open_content.hide();
                            open_content = open = false;
                        }
                        content.hide();
                    }
                } 
            });
        }

        $('body').on('click.dropdown-clear', function(event) {
            if (open && !$(event.target).closest('[data-dropdown]').length) {
                a.removeClass(triangle);
                open.removeClass(open_class);
                open_content.hide();
                open_content = open = false;
            }
        });
    })();

/// =include toggle.js
/// =include validator.js
/// =include tooltips.js
/// =include cookies.js
};

//Uruchomienie skryptów po załadowaniu strony
$(document).ready(konturDruk);