import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/ui'
import { Head, Block, Row, BottomBar } from '../components/blocks'

/** 12b 今晚好眠（v4 长滚动：播放结束后的收尾页） */
export default function SleepEndPage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <TopBar title="今晚好眠" backTo="/sleep/playing" tone="purple" />
      <div className="page-body scroll">
        <Head>播放已结束，祝您晚安</Head>
        <div className="sleep-caption">小伴已停止播放 · 定时已完成</div>
        <Block title="本次播放小结">
          <div className="blk-note">内容：灯笼花园 · 轻柔雨声 ｜ 时长 30 分钟 · 已按定时停止</div>
          <div className="blk-note">明早可以和小伴说说睡得怎么样 · 在健康页的「早晨说说睡得怎样」填写</div>
        </Block>
        <Block>
          <Row
            title="早晨说说睡得怎样"
            sub="主观感受与设备数据分开 · 可跳过"
            action="填写"
            tone="purple"
            onClick={() => navigate('/health/feedback')}
          />
        </Block>
        <Block>
          <div className="blk-note">不凭播放结束或定时推断入睡。本次临时选择已清除，仅保留操作、时间与结果。</div>
        </Block>
      </div>
      <BottomBar
        tone="purple"
        left="再听一段"
        right="回到主页"
        onLeft={() => navigate('/sleep/playing')}
        onRight={() => navigate('/')}
      />
    </div>
  )
}
