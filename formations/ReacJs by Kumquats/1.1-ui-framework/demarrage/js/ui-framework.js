// Coder les classe Component, Button et RoundedRedButton ici


class Component
{

    constructor (tagName, attributes, children)
    {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;

        console.log("Component?constructor");
    }

    render()
    {
        return `<${this.tagName}${this.renderAttributes()}>${this.renderChildren()}</${this.tagName}>`;
    }

    renderAttributes()
    {
        var result = "";
        for ( var key in this.attributes)
        {
            result += ` ${key}="${this.attributes[key]}"`;
        }
        return result;
    }

    renderChildren()
    {
        var result = "";
        if (this.children)
        {
            for ( var i=0; i<this.children.length; i++)
            {
                var item = this.children[i];
                result += (typeof(item) == "string") ? item : this.children[i].render();
            }
        }
        return result;
    }
}

class Button extends Component
{
    constructor(text, attributes)
    {
        super('button', attributes, text);
    }
}

class RoundedRedButton extends Button
{
    constructor(text, attributes)
    {
        //var params = (attributes) ? attributes : {};
        //params.style = "border: none; border-radius: 5px; background-color:red; color: white;"
        super(text, {style: "border: none; border-radius: 5px; background-color:red; color: white;", ...attributes});
    }
}