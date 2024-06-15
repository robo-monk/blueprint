export type NodeId = number;

export interface IProject {
  name: string;
  templates: INodeTemplate[];
  nodes: INode[];
}

export interface INodeTag {
  name: string;
  color: string;
}

export interface INodeStyles {
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
  padding: string;
}

export interface INodeTemplate {
  name: string;
  iconKey: string;
  description: string;
  styles: INodeStyles;
  tags: INodeTag[];
}

export interface INodeEdge {
  id: string;
  type: string;
  target: NodeId;
  label: string;
}

export interface INode extends Partial<INodeTemplate> {
  id: NodeId;
  template: INodeTemplate;
  x: number;
  y: number;
  edges: INodeEdge[];
}

export function newNodeFromTemplate(nodeTemplate: INodeTemplate): INode {
  return {
    id: 0,
    x: 0,
    y: 0,
    template: nodeTemplate,
    edges: [],
  };
}
