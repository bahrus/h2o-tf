import { define } from 'xtal-latx/define.js';
import { XtallatX, disabled } from 'xtal-latx/xtal-latx.js';
export class H2O_TF extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._getTarget = t => {
            let candidate = t.previousElementSibling;
            if (!candidate)
                candidate = t.parentElement;
            return candidate;
        };
    }
    static get is() {
        return 'h2o-tf';
    }
    static get observedAttributes() {
        return [disabled];
    }
    get transform() {
        return this._transform;
    }
    set transform(nv) {
        this._transform = nv;
        this.onPropsChange();
    }
    get getTarget() {
        return this._getTarget;
    }
    set getTarget(nv) {
        this._getTarget = nv;
    }
    connectedCallback() {
        this._upgradeProperties([disabled, 'transform', 'target']);
        this._c = true;
        this.onPropsChange();
    }
    onPropsChange() {
        if (this._disabled || !this._c || !this._transform)
            return;
        const target = this._getTarget(this);
        if (target === null) {
            setTimeout(() => {
                this.onPropsChange();
            }, 50);
            return;
        }
        this.value = {};
        const context = {
            obj: this.value,
            stack: [],
            leaf: this.value,
            processChildren: false,
            el: null,
        };
        this.process(target, context);
        console.log(context);
        this.de('value', {
            value: this.value
        });
    }
    process(target, context) {
        for (const selector in this._transform) {
            if (target.matches && target.matches(selector)) {
                const transformTemplate = this._transform[selector];
                context.processChildren = false;
                context.el = target;
                transformTemplate(context);
                if (context.processChildren && target.childNodes) {
                    target.childNodes.forEach(node => {
                        if (!node.matches)
                            return;
                        this.process(node, context);
                    });
                    const p = context.stack.pop();
                    context.leaf = p;
                }
            }
        }
    }
}
define(H2O_TF);
//# sourceMappingURL=h2o-tf.js.map