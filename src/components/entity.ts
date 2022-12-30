export class Entity {
    private components: Map<string, Component> = new Map();
    public addComponent(component: Component): Entity {
        this.components.set(component.name, component)
        return this;
    } 
    public getComponent(name: string): Component | undefined  {
        return this.components.get(name);
    }
}