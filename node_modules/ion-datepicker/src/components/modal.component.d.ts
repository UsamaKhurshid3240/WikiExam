import { ComponentFactoryResolver, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { BlockerDelegate, GestureController } from 'ionic-angular/gestures/gesture-controller';
import { ModuleLoader } from 'ionic-angular/util/module-loader';
export declare class ModalCmp {
    _cfr: ComponentFactoryResolver;
    _renderer: Renderer;
    _elementRef: ElementRef;
    _navParams: NavParams;
    _viewCtrl: ViewController;
    moduleLoader: ModuleLoader;
    _viewport: ViewContainerRef;
    _bdDismiss: boolean;
    _enabled: boolean;
    _gestureBlocker: BlockerDelegate;
    constructor(_cfr: ComponentFactoryResolver, _renderer: Renderer, _elementRef: ElementRef, _navParams: NavParams, _viewCtrl: ViewController, gestureCtrl: GestureController, moduleLoader: ModuleLoader);
    ionViewPreLoad(): void;
    _viewWillEnter(): void;
    _viewDidLeave(): void;
    _setCssClass(componentRef: any, className: string): void;
    _bdClick(): Promise<any>;
    _keyUp(ev: KeyboardEvent): void;
    ngOnDestroy(): void;
}
