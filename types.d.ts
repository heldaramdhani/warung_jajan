declare module 'swagger-ui-react' {
  import React from 'react';
  const SwaggerUI: React.FC<any>;
  export default SwaggerUI;
}

declare module 'next-swagger-doc' {
  export function createSwaggerSpec(options: any): any;
  export function withSwagger(options: any): any;
}
