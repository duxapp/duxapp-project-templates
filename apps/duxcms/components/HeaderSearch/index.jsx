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
  white,
  grow = true,
  focus,
  ...props
}) => {
  return <Row items='center' grow={grow}
    className={classNames('gap-2 ph-3 r-max', white ? 'bg-white' : 'bg-page', className)}
    style={style}
    self='stretch'
    onClick={onClick}
    {...props}
  >
    <CmsIcon name='search' size={36} color={duxappTheme.textColor3} />
    <InputSearch disabled={disabled} onChange={onChange} focus={focus} className='flex-grow' placeholder={placeholder || '请输入关键词'} />
  </Row>
}
