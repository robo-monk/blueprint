export type NodeId = number;

export interface IProject {
    templates: INodeTemplate[],
    nodes: Node[]
}

export interface INodeTag {
    name: string,
    color: string
}

export interface INodeStyles {
    width: string,
    height: string,
    backgroundColor: string,
    color: string,
    padding: string
}
export interface INodeTemplate {
    name: string,
    icon: string,
    description: string,
    styles: INodeStyles
    tags: INodeTag[]
}

export interface INodeEdge {
    id: string,
    type: string,
    target: NodeId,
    label: string
}

export interface INode extends INodeTemplate {
    id: NodeId,
    template?: INodeTemplate,
    x: number,
    y: number,
    edges: INodeEdge[]
}

