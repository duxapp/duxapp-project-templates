import { InputSearch, Row, duxappTheme } from '@/duxui'
import { CmsIcon } from '@/duxcms'
import classNames from 'classnames'

export const HeaderSearch = ({
  placeholder,
  onChange,
  disabled,
  onClick,
  className,
  style,
  ...props
}) => {
  return <Row items='center' grow className={classNames('gap-2 ph-3 r-max', className)} self='stretch'
    style={{ backgroundColor: duxappTheme.pageColor, ...style }}
    onClick={onClick}
    {...props}
  >
    <CmsIcon name='search' size={36} color={duxappTheme.textColor3} />
    <InputSearch disabled={disabled} onChange={onChange} className='flex-grow' placeholder={placeholder || '请输入关键词'} />
  </Row>
}
