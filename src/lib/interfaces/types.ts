export type NodeId = number;

import { type Edge as XyFlowEdge } from "@xyflow/svelte";

export interface IProject {
  name: string;
  templates: INodeTemplate[];
  nodes: INode[];
  edges: XyFlowEdge[];
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
  styles: Partial<INodeStyles>;
  tags: INodeTag[];
  inputs: IHandle[];
  outputs: IHandle[];
}

export interface INodeEdge {
  id: string;
  type: string;
  target: NodeId;
  label: string;
}

export interface IHandle {
  id: NodeId;
  label: string;
  color: string;
}

export interface INode extends Partial<INodeTemplate> {
  id: NodeId;
  // template: INodeTemplate;
  templateName: string;
  x: number;
  y: number;
}

export function newNodeFromTemplate(nodeTemplate: INodeTemplate): INode {
  return {
    id: 0,
    x: 0,
    y: 0,
    templateName: nodeTemplate.name,
    styles: {},
    // inputs: [],
    // outputs: [],
  };
}
