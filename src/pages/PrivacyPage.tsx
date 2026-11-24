import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BlockBtn } from '../components/blocks'

/** 16 提醒和隐私（v4 长滚动：逐项授权 + 工具权限 + 静默时段 + 撤回/删除分开） */
export default function PrivacyPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="提醒和隐私" backTo="/settings" />
      <div className="page-body scroll">
        <Block>
          <Row title="记住我说的事" sub="未开启 · 只记住您确认的信息" action="查看授权" onClick={() => navigate('/auth')} />
          <Row title="主动来问候" sub="未开启 · 不会主动发起问候" action="查看授权" onClick={() => navigate('/auth')} />
          <Row title="夜间不打扰" sub="未开启 · 21:30—7:00" action="查看时段" />
        </Block>
        <Block title="各项独立，不一并授权">
          <div className="blk-note">以上均未开启。使用前逐项说明、逐项询问；查看不会开启权限，也没有一键全部授权。</div>
          <div className="blk-note">未授权仍可聊天和使用基础助眠；音频播放等工具，使用时另行询问。</div>
        </Block>
        <Head>工具权限 · 全部关闭</Head>
        <Block>
          <div className="blk-note">音频播放：未开启。按需播放故事或自然声音。</div>
          <BlockBtn label="查看音频播放授权" />
          <div className="blk-note" style={{ marginTop: 8 }}>提醒：未开启。只显示您选择并同意的提醒。</div>
          <BlockBtn label="查看提醒授权" />
          <div className="blk-note" style={{ marginTop: 8 }}>设备数据和医疗记录均需另行单独同意，不随其他权限开启。</div>
        </Block>
        <Block title="夜间不打扰 · 未开启">
          <div className="blk-note">时段：晚9:30至早7:00（21:30—7:00）。开启后，在此时段暂停主动消息和提醒。</div>
          <BlockBtn label="设置夜间不打扰" />
          <div className="blk-note" style={{ marginTop: 8 }}>时段内允许提醒：未开启。只有您另行选择，才允许指定提醒，不默认放行。</div>
          <BlockBtn label="查看时段内允许的提醒" />
          <BlockBtn label="保存静默时段" />
        </Block>
        <Block title="撤回授权 ≠ 删除数据">
          <div className="blk-note">撤回后，后续的数据收集与使用立即停止；已存内容不会因此自动删除。</div>
          <BlockBtn label="查看或撤回单项授权" />
        </Block>
        <Block title="删除已存储数据">
          <div className="blk-note">删除是独立选择。先查看要删除的内容，再次确认后处理。</div>
          <BlockBtn label="查看并确认删除数据" />
        </Block>
      </div>
    </div>
  )
}
