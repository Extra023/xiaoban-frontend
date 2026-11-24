import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, BlockBtn } from '../components/blocks'

const CATEGORIES = [
  { key: '记忆与偏好', useFor: '个性化小伴体验', range: '您确认的记忆与明确保存的选择。', extra: null as string | null },
  { key: '自述健康信息', useFor: '查看睡眠与晨间状态', range: '仅限您主动提交的自述。', extra: null as string | null },
  { key: '外部健康数据', useFor: '显示带来源标注的健康摘要', range: '心率、活动、设备睡眠估计，逐项授权。', extra: null as string | null },
  { key: '医疗记录', useFor: '仅用于您明确同意的具体需求', range: '仅限该用途必要且您主动提供的记录。', extra: '默认关闭，须专项同意。普通对话不可检索。每条记录可单独更正、删除或撤回。' },
]

/** 24 我的信息（v4 长滚动：分类管理 + 各类详情 + 撤回删除分开） */
export default function MyInfoPage() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <TopBar title="我的信息" backTo="/health" tone="teal" />
      <div className="page-body scroll">
        <Block title="您想管理什么？">
          <div className="blk-note">目前所有类别都未授权。</div>
          <BlockBtn label="管理授权" tone="teal" onClick={() => navigate('/settings/privacy')} />
          <BlockBtn label="查看或删除资料" tone="teal" />
        </Block>
        <Block title="授权与资料都按类别分开">
          {CATEGORIES.map((c) => (
            <BlockBtn key={c.key} label={c.key} tone="teal" />
          ))}
        </Block>
        {CATEGORIES.map((c) => (
          <Block key={c.key} title={`${c.key} · 未授权`}>
            <div className="blk-note">用途：{c.useFor} 范围：{c.range}</div>
            <div className="blk-note">状态：从未授权 授权有效期：未设置 资料保留期限：未选择</div>
            <BlockBtn label="查看此类单项授权" tone="teal" />
            <BlockBtn label="查看、更正或删除此类资料" tone="teal" />
            <BlockBtn label={c.key === '医疗记录' ? '设置医疗保留截止日期' : '选择此类保留期限'} tone="teal" />
            {c.extra && <div className="blk-note" style={{ marginTop: 6 }}>{c.extra}</div>}
          </Block>
        ))}
        <Head>撤回不是删除</Head>
        <Block>
          <div className="blk-note">撤回后，立即停止后续收集、同步和使用。已保存资料不会自动删除，需单独选择删除。</div>
          <BlockBtn label="按类别查看或撤回授权" tone="teal" />
          <div className="blk-note" style={{ marginTop: 8 }}>先选类别与具体资料。再核对内容、日期和删除范围。第二次明确确认后才删除，也可以取消。</div>
          <BlockBtn label="选择要删除的资料" tone="teal" />
        </Block>
        <Block title="只用已获授权的最小摘要">
          <div className="blk-note">各类资料分区保存，不自动进入普通对话。健康陪伴仅使用单独授权的最小摘要。医疗资料仍受专项限制，普通对话不可检索。</div>
        </Block>
        <Block title="功能授权也要分开看">
          <div className="blk-note">主动关怀：未允许 音频播放：未允许 提醒：未允许</div>
          <div className="blk-note">每项先说明用途、范围和有效期，再单独同意。不默认开启，也不因填写感受而开启。</div>
          <BlockBtn label="查看逐项功能授权" tone="teal" />
        </Block>
      </div>
    </div>
  )
}
