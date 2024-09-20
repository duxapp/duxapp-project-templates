import { DataSource } from '@/design/Component/Data'
import { usePageData } from '@/duxcmsUser'

export {
  HomeNav as ShopNav,
  Price as ShopPrice,
  Address as ShopAddress,
  NumInput as ShopNumInput,
  HeaderSearch as ShopHeaderSearch
} from '@/duxcmsShop'

export const ShopDataSource = ({ children, api = 'content/article' }) => {

  const [list] = usePageData(api)

  return <DataSource data={list}>
    {children}
  </DataSource>
}
