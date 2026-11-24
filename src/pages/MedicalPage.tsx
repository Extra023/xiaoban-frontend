import { TopBar } from '../components/ui'
import { Block, BlockBtn, BottomBar } from '../components/blocks'

/** 23 医疗资料（v4 长滚动：默认不收集 + 专项同意 + 空状态 + 逐条管理） */
export default function MedicalPage() {
  return (
    <div className="page">
      <TopBar title="私密医疗" backTo="/health" tone="teal" />
      <div className="page-body scroll">
        <Block title="暂无医疗记录">
          <div className="blk-note">尚未授权 · 默认关闭</div>
          <div className="blk-note">基础陪伴不需要医疗资料。不需要为了使用陪伴而填写病史。</div>
          <div className="blk-note">这里不提供诊断、处方或预约服务。</div>
        </Block>
        <Block title="普通对话不可检索">
          <div className="blk-note">医疗资料放在独立受限区域。未经专项同意，不开始收集或使用。此页未表示已提供任何医疗服务。</div>
        </Block>
        <Block title="每个具体用途，都要单独同意">
          <div className="blk-note">具体用途</div>
          <div className="blk-note">尚未选择；先说明为什么需要。</div>
          <div className="blk-note" style={{ marginTop: 6 }}>记录范围</div>
          <div className="blk-note">尚未选择；只取该用途必要的记录。</div>
          <div className="blk-note" style={{ marginTop: 6 }}>使用期限</div>
          <div className="blk-note">尚未设置；先明确使用至哪一天。</div>
          <div className="blk-note" style={{ marginTop: 6 }}>保留期限</div>
          <div className="blk-note">尚未选择；与使用期限分开确认。</div>
          <div className="blk-note" style={{ marginTop: 6 }}>用途、范围、期限说明清楚后，才可同意。不同意，也不影响基础陪伴。</div>
          <BlockBtn label="查看专项同意内容" tone="teal" />
          <BlockBtn label="暂不授权" tone="teal" />
        </Block>
        <Block title="当前没有可查看的资料">
          <div className="blk-note">病史：空 用药信息：空 检查记录：空</div>
        </Block>
        <Block title="每条记录都能单独处理">
          <div className="blk-note">先选记录，再更正、删除或撤回授权。撤回立即停止后续使用，不自动删除旧记录。删除前再次确认；保留期限分开选择。</div>
          <BlockBtn label="查看逐条更正与删除说明" tone="teal" />
          <BlockBtn label="查看撤回医疗授权说明" tone="teal" />
        </Block>
      </div>
      <BottomBar tone="teal" left="查看使用说明" onLeft={() => history.back()} />
    </div>
  )
}
