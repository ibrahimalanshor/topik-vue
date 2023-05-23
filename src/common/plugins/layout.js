import * as layouts from '@/components/layout';

export function useLayout(app) {
  for (const layout in layouts) {
    app.component(layouts[layout].name, layouts[layout]);
  }
}
