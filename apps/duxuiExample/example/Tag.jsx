import { Cell, Tag, Header, ScrollView, TopView, GroupList, CellGroup } from '@/duxuiExample'

export default function TagExample() {
  return <TopView>
    <Header title='Tag' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <CellGroup line={false}>
            <Cell title='default' desc={<Tag type='default'>标签</Tag>} />
            <Cell title='primary' desc={<Tag type='primary'>标签</Tag>} />
            <Cell title='success' desc={<Tag type='success'>标签</Tag>} />
            <Cell title='danger' desc={<Tag type='danger'>标签</Tag>} />
            <Cell title='warning' desc={<Tag type='warning'>标签</Tag>} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='圆角'>
          <CellGroup line={false}>
            <Cell title='直角' desc={<Tag radiusType='square'>标签</Tag>} />
            <Cell title='小圆角' desc={<Tag radiusType='round-min'>标签</Tag>} />
            <Cell title='圆角' desc={<Tag radiusType='round'>标签</Tag>} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='尺寸'>
          <CellGroup line={false}>
            <Cell title='s' desc={<Tag size='s'>标签</Tag>} />
            <Cell title='m' desc={<Tag size='m'>标签</Tag>} />
            <Cell title='l' desc={<Tag size='l'>标签</Tag>} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='其他'>
          <CellGroup line={false}>
            <Cell title='default' desc={<Tag plain texColor='#666'>标签</Tag>} />
            <Cell title='primary' desc={<Tag plain>标签</Tag>} />
            <Cell title='success' desc={<Tag>标签</Tag>} />
          </CellGroup>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
