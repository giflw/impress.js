/**
 * Fullscreen plugin
 *
 * Press F5 to enter fullscreen and ESC to exit fullscreen mode.
 *
 * Copyright 2019 @giflw
 * Released under the MIT license.
 */
/* global document */

( function( document ) {
    "use strict";

    function enterFullscreen() {
        var elem = document.documentElement;
        if ( !document.fullscreenElement && !document.mozFullScreenElement &&
             !document.webkitFullscreenElement && !document.msFullscreenElement ) {
            if ( elem.requestFullscreen ) {
                elem.requestFullscreen();
            } else if ( elem.msRequestFullscreen ) {
                elem.msRequestFullscreen();
            } else if ( elem.mozRequestFullScreen ) {
                elem.mozRequestFullScreen();
            } else if ( elem.webkitRequestFullscreen ) {
                elem.webkitRequestFullscreen( Element.ALLOW_KEYBOARD_INPUT );
            }
        }
    }

    function exitFullscreen() {
        if ( document.exitFullscreen ) {
            document.exitFullscreen();
        } else if ( document.msExitFullscreen ) {
            document.msExitFullscreen();
        } else if ( document.mozCancelFullScreen ) {
            document.mozCancelFullScreen();
        } else if ( document.webkitExitFullscreen ) {
            document.webkitExitFullscreen();
        }
    }

    // Wait for impress.js to be initialized
    document.addEventListener( "impress:init", function( event ) {
        var api = event.detail.api;
        var root = event.target;
        var gc = api.lib.gc;
        var util = api.lib.util;

        util.triggerEvent( document, "impress:help:add",
            { command: "F5 / ESC", text: "Fullscreen: Enter / Exit", row: 200 }
        );

        gc.addEventListener( document, "keydown", function( event ) {

            // 116 (F5) is sent by presentation remote controllers
            if ( event.code === "F5" ) {
                event.preventDefault();
                enterFullscreen();
                util.triggerEvent( root.querySelector( ".active" ), "impress:steprefresh" );
            }
        }, false );

        gc.addEventListener( document, "keydown", function( event ) {

            // 27 (Escape) is sent by presentation remote controllers
            if ( event.keyCode === 27 ) {
                event.preventDefault();
                exitFullscreen();
                util.triggerEvent( root.querySelector( ".active" ), "impress:steprefresh" );
            }
        }, false );

    }, false );

} )( document );

