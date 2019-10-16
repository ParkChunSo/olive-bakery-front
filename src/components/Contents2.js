import React, {Component} from 'react';	
import './Contents2.css';

class Contents2 extends Component {
	render() {
		return (
			<div className='contents2_main'>
				<div className='contents2'>
					<div className='card'>
						<div className='blank'/>
						<div className='card_contents1'>
							<h2>유기농 재료</h2>
							<p>100% 유기농 밀가루만 사용합니다.</p>
						</div>
					</div>
					<div className='card'>
						<div className='blank'/>
						<div className='card_contents2'>
							<h2>POOLISH</h2>
							<p>폴리쉬 반죽으로 부드럽고 소화 잘되는 빵</p>
						</div>
					</div>
					<div className='card'>
						<div className='blank'/>
						<div className='card_contents3'>
							<h2>건강한 재료</h2>
							<p>100% 우유버터와 우유만을 사용합니다.</p>
						</div>
					</div>
					<div className='card'>
						<div className='blank'/>
						<div className='card_contents4'>
							<h2>신선한 빵</h2>
							<p>매일 아침 구워낸 신선한 빵을 구워 냅니다.</p>
						</div>
					</div>

					<h2><span>DELIVERY</span></h2>
					<p>
						빵의 종류에 따라 보관할 수 있는 기간이 다르겠으나<br/>
						우리가 만드는 모든 빵에는 방부제나 화학적 첨가물이 사용되지 않기에 유통기한이 짧을 수 밖에 없습니다.<br/>
						그렇기 때문에 택배 배송을 통한 구매를 원하시는 분은 매장으로 직접 문의 해 주시기 바랍니다.<br/>
					</p>
				</div>
			</div>
		);
	}
}
export default Contents2;