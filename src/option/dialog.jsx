console.log( "=== simpread option dialog ===" )

import FocusOpt  from 'focusopt';
import { storage, STORAGE_MODE } from 'storage';
import Notify from 'notify';

const optbgcls = "ks-simpread-option-bg",
      optbg    = `<div class="${ optbgcls }"></div>`;

/**
 * Dialog Rect component
 */
export default class Dialog extends React.Component {

    // close dialog
    close( restore = rollback() ) {
        $( "." + optbgcls ).addClass( "ks-simpread-option-bg-hide" );
        $( "." + optbgcls ).one( "animationend", () => $( "." + optbgcls ).remove() );
    }

    // save dialog focus option
    save() {
        console.log( "dialog click submit button.", storage.current )
        storage.Set( STORAGE_MODE.focus );
        chrome.runtime.sendMessage({ type: "shortcuts" });
        new Notify().Render( 0, "更新成功！" );
        this.close( false );
    }

    constructor( props ) {
        super( props );
    }

    render() {
        let Option;
        if ( this.props.type == STORAGE_MODE.focus ) Option = FocusOpt;
        return (
            <div className="ks-simpread-option-dialog">
                <div className="ks-simpread-option-content">
                    <Option option={ storage.current } />
                </div>
                <div className="ks-simpread-option-footer">
                    <a 
                        href="javascript:void(0);"
                        className="ks-simpread-option-btn ks-simpread-option-submit"
                        onClick={ () => this.save() }>
                        确认
                    </a>
                    <a 
                        href="javascript:void(0);"
                        className="ks-simpread-option-btn ks-simpread-option-cancel"
                        onClick={ () => this.close() }>
                        取消
                    </a>
                </div>
            </div>
        )
    }
}

/**
 * Roll back when cancel button click
 */
function rollback() {
    storage.Restore( STORAGE_MODE.focus );
    $( ".ks-simpread-bg" ).css({ "background-color" : storage.current.bgcolor });
}

/**
 * get Dialog background document
 */
export function getDialogBackground() {
    if ( $( "body" ).find( "." + optbgcls ).length == 0 ) {
        $( "body" ).append( optbg );
    }
    return $( "." + optbgcls )[0];
}