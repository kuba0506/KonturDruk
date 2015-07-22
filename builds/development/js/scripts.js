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
/*
    ##       ####  ######   ##     ## ######## ########   #######  ##     ##
    ##        ##  ##    ##  ##     ##    ##    ##     ## ##     ##  ##   ##
    ##        ##  ##        ##     ##    ##    ##     ## ##     ##   ## ##
    ##        ##  ##   #### #########    ##    ########  ##     ##    ###
    ##        ##  ##    ##  ##     ##    ##    ##     ## ##     ##   ## ##
    ##        ##  ##    ##  ##     ##    ##    ##     ## ##     ##  ##   ##
    ######## ####  ######   ##     ##    ##    ########   #######  ##     ##
*/
    (function() {
        $('[data-lightbox]').each(function() {
            var el = $(this),
                config = {
                    delegate: el.is('a') ? undefined : el.data('lightbox')||'a',
                    gallery: {
                        enabled: true,
                        tPrev: 'Poprzednie',
                        tNext: 'Następne',
                        tCounter: '%curr%/%total%'
                    },
                    mainClass: 'mfp-fade',
                    removalDelay: 300,
                    type: 'image'
                };
            if(el.data('lightboxConfig')) {
                config = el.dataConfig('lightboxConfig', config);
            }
            el.magnificPopup(config);
        });
    })();
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
            open_class = 'dropdown--open',
            open = false,
            open_content = false,
            timer = null,
            timer_time = 350;

        dropdowns.on('click mouseenter mouseleave', function(event) {
            if (event.type === 'mouseleave') {
                timer = setTimeout(function() {
                    if (open) {
                        open.removeClass(open_class);
                        open_content.hide();
                        open_content = open = false;
                    }
                }, timer_time);
            } else {
                clearTimeout(timer);
            }
            if ($(event.target).closest('[data-dropdown-content]').length) {
                return;
            }
            event.preventDefault();
            var link = $(this),
                content = link.find('[data-dropdown-content]');
            if (event.type === 'click') {
                if (!open) {
                    link.addClass(open_class);
                    content.show();
                    open = link;
                    open_content = content;
                } else {
                    if (open) {
                        open.removeClass(open_class);
                        open_content.hide();
                        open_content = open = false;
                    }
                    content.hide();
                }
            } else if (event.type === 'mouseenter') {
                if (open) {
                    open.removeClass(open_class);
                    open_content.hide();
                    content.show();
                    link.addClass(open_class);
                    open = link;
                    open_content = content;
                } else {
                    //dodano 16.01.15
                    link.addClass(open_class);
                    content.show();
                    open = link;
                    open_content = content;
                }
            }
        });

        $('body').on('click.dropdown-clear', function(event) {
            if (open && !$(event.target).closest('[data-dropdown]').length) {
                open.removeClass(open_class);
                open_content.hide();
                open_content = open = false;
            }
        });
    })();

/*
    ########  #######   ######    ######   ##       ########
       ##    ##     ## ##    ##  ##    ##  ##       ##
       ##    ##     ## ##        ##        ##       ##
       ##    ##     ## ##   #### ##   #### ##       ######
       ##    ##     ## ##    ##  ##    ##  ##       ##
       ##    ##     ## ##    ##  ##    ##  ##       ##
       ##     #######   ######    ######   ######## ########
*/
    (function() {
        var toogles = $('[data-toggle]');
        toogles.on('change click keyup', function(event) {
            var el = $(this),
                toggle = $(el.data('toggle')),
                clear  = el.data('toggleClear');

            if (el.is(':checkbox')){
                if (el.prop('checked')) {
                    toggle.show();
                } else {
                    toggle.hide();
                    if (clear) {
                        toggle.find('input:text, textarea').val('');
                    }
                }
            } else if (el.is('select')) {
                var selected = el.find('option:selected');
                toggle = $(selected.data('val'));
                selected.siblings().each(function() {
                    $($(this).data('val')).hide();
                });
                toggle.show();
            } else if (el.is(':radio')) {
                if (el.prop('checked')) {
                    var form = el.parents('form'),
                        name = el.attr('name');
                    form.find('[name="'+name+'"]').each(function() {
                        $($(this).data('toggle')).hide();
                    });
                    toggle.show();
                } else {
                    toggle.hide();
                }
            } else {
                toggle.toggle();
                event.preventDefault();
            }
            // Ala F5 dla tooltipów bo możliwe, że zmieniła się ich pozycja
            $('body, html').trigger('resize');
        });

        // Odświeżamy domyslnie zaznaczone checkboxy
        toogles.filter('input:checkbox, input:radio, select').trigger('change');
    })();
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
/*
    ########  #######   #######  ##       ######## #### ########   ######
       ##    ##     ## ##     ## ##          ##     ##  ##     ## ##    ##
       ##    ##     ## ##     ## ##          ##     ##  ##     ## ##
       ##    ##     ## ##     ## ##          ##     ##  ########   ######
       ##    ##     ## ##     ## ##          ##     ##  ##              ##
       ##    ##     ## ##     ## ##          ##     ##  ##        ##    ##
       ##     #######   #######  ########    ##    #### ##         ######
*/
    (function() {

        $('[data-title]').each(function() {
            var el = $(this);
            el.qtip({
                content: {
                    attr: el.data('title') ? 'data-title' : 'title'
                },
                style: {
                    tip: false
                },
                position: {
                    adjust: {
                        x: 5,
                        y: 5
                    }
                }
            });
        });

        // Images
        var dataImage = $('[data-image]'),
            dataImageImages = [];
        if (dataImage.size()) {
            dataImage.each(function() {
                dataImageImages.push($(this).data('image'));
            });
            preload(dataImageImages);

            dataImage.qtip({
                content: {
                    text: function(api) {
                        return $('<img />').attr('src', $(this).data('image'));
                    }
                },
                position: {
                    viewport: $('body'),
                    adjust: {
                        x: 5,
                        y: 5
                    }
                },
                style: {
                    tip: false,
                    offset: 10,
                    classes: 'qtip--image'
                },
                show: {
                    delay: 300
                }
            });
        }

        // Zoom
        var dataZoom = $('[data-zoom]'),
            dataZoomImages = [];
        if (dataZoom.size()) {
            dataZoom.each(function() {
                dataZoomImages.push($(this).data('zoom'));
            });
            preload(dataZoomImages);

            dataZoom.qtip({
                content: {
                    text: function(api) {
                        var parent = $(this).parents('a');
                        if (parent.size()) {
                            var a = $('<a/>', {
                                href: parent.attr('href')
                            });
                            return a.append($('<img />').attr('src', $(this).data('zoom')));
                        } else {
                            return $('<img />').attr('src', $(this).data('zoom'));
                        }
                    }
                },
                position: {
                    viewport: $('body'),
                    my: 'center center',
                    at: 'center center',
                    adjust: {
                        method: 'shift none'
                    }
                },
                style: {
                    classes: 'qtip--image'
                },
                show: {
                    delay: 300
                },
                hide: {
                    fixed: true
                }
            });
        }
    })();
/*
     ######   #######   #######  ##    ## #### ########  ######
    ##    ## ##     ## ##     ## ##   ##   ##  ##       ##    ##
    ##       ##     ## ##     ## ##  ##    ##  ##       ##
    ##       ##     ## ##     ## #####     ##  ######    ######
    ##       ##     ## ##     ## ##  ##    ##  ##             ##
    ##    ## ##     ## ##     ## ##   ##   ##  ##       ##    ##
     ######   #######   #######  ##    ## #### ########  ######
*/

    (function() {

        function CookieMonster() {
            this.init.apply(this, arguments);
        }

        CookieMonster.prototype = {
            init: function(info, more, description, force) {
                if(this.showed() && !force) return;
                this.html = $(
                    '<div class="cookieMonster">' +
                        '<div class="cookieMonster-info">' +
                            info +
                            '<span href="#" class="cookieMonster-close">&times;</span>' +
                            '<span href="#" class="cookieMonster-more">' + more + '</span>' +
                        '</div>' +
                        '<div class="cookieMonster-description">' + description + '</div>' +
                    '</div>'
                );
                var self = this,
                    body = $(document.body);

                this.html.appendTo(body);
                this.description = this.html.find('.cookieMonster-description');
                this.more = this.html.find('.cookieMonster-more');
                this.close = this.html.find('.cookieMonster-close');

                this.more.bind('click.cookieMonster', function() {
                    self.showDescription();
                });

                this.close.bind('click.cookieMonster', function() {
                    self.hide();
                });
            },
            hide: function() {
                this.html.slideUp(200, function() {
                    $(this).remove();
                });
                this.showed(true);
            },
            showed: function(save) {
                if(save) {
                    var date = new Date();
                    date.setTime(date.getTime()+(356*24*60*60*1000));
                    document.cookie = "CookieMonster=showed; expires="+date.toGMTString()+"; path=/";
                } else {
                    var name = "CookieMonster=";
                    var ca = document.cookie.split(';');
                    for(var i=0;i < ca.length;i++) {
                        var c = ca[i];
                        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
                    }
                    return null;
                }
            },
            showDescription: function() {
                this.description.slideToggle();
            }
        };


        new CookieMonster(
            'Nasza strona używa plików cookies. Jeśli nie chcesz, by pliki cookies były zapisywane na Twoim dysku zmień ustawienia swojej przeglądarki.',
            'Przeczytaj więcej o cookies',
            '<p><b>Czym są pliki "cookies"?</b></p>' +
            '<p>Pliki "cookies" to informacje tekstowe przechowywane na urządzeniu końcowym użytkownika (przeglądarka internetowa) w celu rozpoznania urządzenia  tak, aby móc dostarczyć funkcjonalności  takich jak np.: koszyk sklepowy, logowanie. Pliki cookies nie wyrządzają żadnych szkód urządzeniom na których są zapisywane.</p>' +
            '<p><b>Pliki cookies są wykorzystywane  na niniejszej stronie internetowej, do poniższych celów:</b></p>' +
            '<ul>' +
                '<li>utrzymywanie sesji użytkownika  na stronie po zalogowaniu, dzięki czemu nie ma konieczności podawania loginu i hasła na każdej podstronie, którą odwiedza użytkownik. Plik "cookies" wykorzystywane do tego celu są przechowywane tylko do momentu zakończenia sesji danej przeglądarki. Są automatycznie usuwane po jej zamknięciu.</li>' +
                '<li>umożliwienie funkcjonowania mechanizmu "koszyka sklepowego", który zapamiętuje produkty do niego dodane, bez konieczności ponownego ich dodawania do koszyka za każdym razem gdy użytkownik przechodzi na kolejną podstronę. Plik "cookies "wykorzystywane do tego celu  mogą być przechowywane dłużej niż bieżąca sesja przeglądarki użytkownika aby móc zapamiętać i przywrócić w razie zamknięcia przeglądarki, produktów, które użytkownik dodał do koszyka.</li>' +
                '<li>gromadzenie ogólnych, anonimowych statystyk  zachowań użytkowników na stronie, w celu poprawy zawartości oraz funkcjonalności strony internetowej.</li>' +
            '</ul>' +
            '<p><b>Usuwanie plików cookies:</b></p>' +
            '<p>Oprogramowanie do przeglądania stron internetowych ma domyślnie ustawione akceptowanie przyjmowania plików cookies. Ustawienie to można zmienić samodzielnie w dowolnym czasie tak aby pliki cookies były blokowane. Zablokowanie plików cookies może jednak spowodować nieprawidłowe funkcjonowanie mechanizmów na stronie internetowej co uniemożliwi w szczególności np.: korzystanie z koszyka zakupowego lub logowanie użytkownika.</p>'
        );

};

//Uruchomienie skryptów po załadowaniu strony
$(document).ready(konturDruk);