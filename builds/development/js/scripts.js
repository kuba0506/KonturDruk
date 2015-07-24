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
/*
    ##     ##    ###    ##       #### ########     ###    ########  #######  ########
    ##     ##   ## ##   ##        ##  ##     ##   ## ##      ##    ##     ## ##     ##
    ##     ##  ##   ##  ##        ##  ##     ##  ##   ##     ##    ##     ## ##     ##
    ##     ## ##     ## ##        ##  ##     ## ##     ##    ##    ##     ## ########
     ##   ##  ######### ##        ##  ##     ## #########    ##    ##     ## ##   ##
      ## ##   ##     ## ##        ##  ##     ## ##     ##    ##    ##     ## ##    ##
       ###    ##     ## ######## #### ########  ##     ##    ##     #######  ##     ##
*/
    $('form').Valider({
        onInputError: function(error) {
            var label = this.closest('.label');
            if(label.length) {
                label.addClass('label--invalid');
            }
            var pos = {
                my: 'left center',
                at: 'right center',
                viewport: $('body'),
                adjust: {
                    x: 5,
                    y: 0
                }
            },
            customClasses = '';

            if(this.attr('type') === 'checkbox' || this.hasClass('tooltip-left')) {
                pos.my = 'right center';
                pos.at = 'left center';
                pos.adjust.x = -5;
                customClasses = 'qtip--smallInput';
            }
            this.qtip({
                content: {
                    text: error
                },
                show: {
                    event: false,
                    effect: false
                },
                hide: false,
                position: pos,
                style: {
                    tip: false,
                    classes: 'qtip--form qtip--error '+customClasses
                }
            }).qtip('enable').qtip('show');
        },
        onInputPass: function() {
            this.qtip('destroy');
            var label = this.closest('.label');
            if(label.length) {
                label.removeClass('label--invalid');
            }
        }
    });
/// =include tooltips.js
/// =include cookies.js
/**
 *     __    ____  ______
    / /   / __ \/ ____/
   / /   / / / / / __  
  / /___/ /_/ / /_/ /  
 /_____/\____/\____/   
                       
 */

function log() {
    try {
        console.log.apply(console, arguments);
    } catch (e) {
        try {
            opera.postError.apply(opera, arguments);
        } catch (e) {
            alert(Array.prototype.join.call(arguments, ''));
        }
    }
}
};

//Uruchomienie skryptów po załadowaniu strony
$(document).ready(konturDruk);