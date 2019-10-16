import React, {Component} from 'react';	
import './Contents.css';

class Contents extends Component {
	render() {
		return (
			<div className='explanation'>
				<div className='left'>
					<div className='contents'>
						<h2 className='title'>좋은 빵을 만들기 위한 노력</h2>
						<h4 className='sub'>유기농 밀가루, 천연 발효, 폴리쉬 반죽을 통한 부드럽고 소화 잘되는 빵</h4>
						<img src={'http://olivebakery.cafe24.com/wp-content/uploads/2016/04/339410.jpg'}/>
						<img src={'http://olivebakery.kr/wp-content/uploads/2016/05/IMG_4903_300.jpg'}/>
						<p className='text'>사실 현재와 같이 제빵의 대기업화, 또는 대량 생산화 되기 전까지 제빵기술은 엄청난 노동력과 노력을 필요로하는 작업중의 하나였습니다. 천연 효모로 빵을 굽던 시절 24시간 동안 네번은 리프레시 해야 했고 이런 작업을 통해 생산되는 빵의 양이 많을 수 없기에 다양한 장비들을 들여 화학적인 재료를 사용하여 대량 생산되는 빵들과 경쟁하기 힘들어 졌죠. 천연 효모를 발효하고 다음날 만들 빵의 반죽을 미리 저온 숙성하며 신선하고 맛있는 재료를 구하러 다니다 보니 고객에게 많은 양을 제공할 수는 없으나 하나를 만들더라도 내 가족을 위해 준비하는 마음으로 모든 빵을 대하고 있습니다.</p>
						<p className='text'>오늘도 우리는 건강하고 맛있는 빵을 만들기 위해 우리가 할 수 있는 최대한의 노력이 무엇일까를 고민하고, 실행하고 있으며 지금의 칭찬에 만족하고, 안주하지 않고 항상 새로운 빵에 대한 연구를 게을리 하지 않을 것을 약속드리겠습니다.</p>
					</div>
				</div>
				<div className='right'>
					<img className='img3' src={'http://olivebakery.kr/wp-content/uploads/2015/02/IMG_5138.jpg'}/>
				</div>
			</div>
		);
	}
}
export default Contents;