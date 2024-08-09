import './index.css'

const TabItems = props => {
  const {tab, onChangeTab, isActive} = props

  const onClickTabItem = () => {
    onChangeTab(tab)
  }

  const verifyActiveTab = isActive ? 'active-tab' : ''

  return (
    <div>
      <button
        type="button"
        className={`tab-item ${verifyActiveTab}`}
        onClick={onClickTabItem}
      >
        {' '}
        {tab}{' '}
      </button>
    </div>
  )
}

export default TabItems
