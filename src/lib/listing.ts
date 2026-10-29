import type { CatalogGroup } from "@/lib/catalog"

export interface SiblingItem {
  name: string
  href: string
  count: number
}

export interface IndexItem extends SiblingItem {
  image: string | undefined
}

export interface ListingProps {
  group: CatalogGroup
  siblings: SiblingItem[]
}

export const listingPaths = <ParamName extends string>(
  groups: CatalogGroup[],
  paramName: ParamName,
  basePath: string
): { params: Record<ParamName, string>; props: ListingProps }[] =>
  groups.map((group) => ({
    params: { [paramName]: group.slug } as Record<ParamName, string>,
    props: {
      group,
      siblings: groups
        .filter((other) => other.slug !== group.slug)
        .map((other) => ({
          name: other.name,
          href: `${basePath}${other.slug}/`,
          count: other.recipes.length,
        })),
    },
  }))

export const toIndexItems = (groups: CatalogGroup[], basePath: string): IndexItem[] =>
  groups.map((group) => ({
    name: group.name,
    href: `${basePath}${group.slug}/`,
    count: group.recipes.length,
    image: group.recipes[0]?.image,
  }))
