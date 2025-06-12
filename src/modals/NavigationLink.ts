export type NavigationLink = {
 id: number,
 displayName: string,
 route: string,
 isDefaultLink: boolean,
 hasNestedLink: boolean,
 componentPath: string,
 parentRoute?: string,
 children?: NavigationLink[],
 beforeEnter?: (to: { params: { id: number } }) => boolean | void,
}
