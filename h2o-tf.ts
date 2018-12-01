import {define} from 'xtal-latx/define.js';
import {XtallatX, disabled} from 'xtal-latx/xtal-latx.js';
interface IContext{
    obj: any,
    stack: any[],
    processChildren: boolean;
    leaf: any,
    el: Element | null,
}


export class H2O_TF extends XtallatX(HTMLElement){
    static get is(){
        return 'h2o-tf';
    }
    static get observedAttributes(){
        return [disabled];
    }
    _transform! : {[key: string] : (context: IContext) => void }
    get transform(){
        return this._transform;
    }
    set transform(nv){
        this._transform = nv;
        this.onPropsChange();
    }
    _getTarget : (h: H2O_TF) => Element | null = t => {
        let candidate = t.previousElementSibling;
        if(!candidate) candidate = t.parentElement
        return candidate;
    }
    get getTarget(){
        return this._getTarget;
    }
    set getTarget(nv){
        this._getTarget = nv;
    }
    _c!: boolean;
    connectedCallback(){
        this.style.display = 'none';
        this._upgradeProperties([disabled, 'transform', 'target']);
        this._c = true;
        this.onPropsChange();
    }
    value!: any;
    onPropsChange(){
        if(this._disabled || !this._c || !this._transform) return;
        const target = this._getTarget(this);
        if(target === null){
            setTimeout(() =>{
                this.onPropsChange()
            }, 50);
            return;
        }
        this.value = {};
        const context  = {
            obj: this.value, 
            stack: [],
            leaf: this.value,
            processChildren: false,
            el: null,
        } as IContext;
        
        this.process(target, context);
        this.de('value', {
            value: this.value
        })
    }

    process(target: Element, context: IContext){
        for(const selector in this._transform){
            if(target.matches && target.matches(selector)){
                const transformTemplate = this._transform[selector];
                context.processChildren = false;
                context.el = target;
                transformTemplate(context);
                if(context.processChildren && target.childNodes){
                    target.childNodes.forEach(node =>{
                        if(!(<any>node).matches) return;
                        this.process((<any>node) as Element, context)
                    });
                    const p = context.stack.pop();
                    context.leaf = p;
                }
            }
        }
    }

}

define(H2O_TF);