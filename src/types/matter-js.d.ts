import "matter-js";

declare module "matter-js" {
  export interface IRenderDefinition {
    sprite?: {
      texture: string;
      xScale?: number;
      yScale?: number;
    };
  }

  export interface IBodyDefinition {
    render?: IRenderDefinition;
  }
}
