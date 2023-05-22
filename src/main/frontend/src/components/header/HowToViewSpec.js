import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import styles from "./topNavigationBar.module.css";


function HowToViewSpec() {

    useEffect(() => {
        document.body.style.backgroundColor = '#F0F6F8';
        document.body.style.color = "black";
        return () => {
            document.body.style.backgroundColor = '#151515';
            document.body.style.color = "white";
        };
    }, []);

    return (
        <>
            <div className={styles.introduceSite}>
                <h2>&nbsp;How to use?</h2>
                <Accordion defaultActiveKey={['0']} alwaysOpen >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>사이트의 목적</Accordion.Header>
                        <Accordion.Body>
                            사용자의 컴퓨터 스펙(CPU, GPU, RAM) 정보를 자동으로 가져와 알려주고, 다른 제품들과 비교하여 수준을 파악할 수 있으며,
                            사용자가 궁금한 제품을 직접 선택하여 확인할 수도 있습니다. CPU와 GPU 간의 병목 현상 여부를 확인할 수 있고 그에 맞는 업그레이드할 제품을 추천해주기도 합니다.
                            또한 자신의 스펙 또는 선택한 스펙으로 실행 가능한 게임을 확인할 수 있습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>내 스펙 불러오는법</Accordion.Header>
                        <Accordion.Body>
                            사이트 첫 화면에 있는 Get My Spec 버튼을 누르면 다운로드 창으로 넘어가게 됩니다. 그곳에서 download 버튼을 누르면 실행 파일이 다운로드 되는데 그 파일을 실행하여
                            본인 컴퓨터의 스펙을 불러오게 됩니다. CPU, GPU, RAM 카테고리에서는 본인의 스펙과 비슷한 스펙의 정보를 보여주고 각각의 부품 정보를 눌러 해당 부품의 상세 정보를 볼 수 있습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>원하는 스펙 입력</Accordion.Header>
                        <Accordion.Body>
                            사이트 첫 화면에 있는 Insert Spec 버튼을 누르면 원하는 CPU, GPU, RAM 정보를 입력할 수 있습니다. 각각의 스펙을 입력하고 submit 버튼을 누르면 사용자가 고른 스펙에 대한
                            정보를 볼 수 있고 그 스펙에 대한 병목현상을 간략하게 볼 수도 있습니다. 스펙을 입력한 상태에서도 CPU, GPU, RAM 카테고리에서는 사용자가 선택한 스펙과 비슷한 스펙의 부품 정보를
                            볼 수 있습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>병목현상(BottleNeck)</Accordion.Header>
                        <Accordion.Body>
                            병목현상 카테고리에서는 원하는 CPU, GPU 부품 정보를 입력하여 둘 사이의 병목현상을 자세히 보여줍니다. 두 부품 사이에 몇 %의 병목현상이 존재하고 이것이 CPU 문제인지, GPU 문제인지
                            나타내 주어 문제점을 파악하고 더 나은 경험을 위한 해결책을 차트를 통해 제시해 줍니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>게임</Accordion.Header>
                        <Accordion.Body>
                            게임 카테고리에서는 사용자 스펙에 대한 해당 게임의 적합성을 나타내 줍니다. 원하는 게임을 검색하여 고르면 해당 게임의 최소사양과 권장사양을 나타내주고 사용자가 불러온 스펙과 비교하여 게임이
                            잘 돌아가는지 여부를 표시해 주어 한눈에 파악할 수 있습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className={styles.introduceSite}>
                <h2>&nbsp;Q&A</h2>
                <Accordion defaultActiveKey={['0']} alwaysOpen >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>컴퓨터 병목현상이란?</Accordion.Header>
                        <Accordion.Body>
                            컴퓨터 성능의 병목 현상은 구성 요소나 시스템이 전체 성능을 제한하는 용량으로 작동할 때 발생합니다.
                            이는 메모리 부족, 느린 하드 드라이브, 약한 프로세서 또는 약한 그래픽 카드를 비롯한 다양한 요인으로 인해 발생할 수 있습니다.
                            병목 현상을 식별하고 해결하면 전체 시스템 성능을 개선하는 데 도움이 될 수 있습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>그래픽 카드가 병목현상이 될 수 있는가?</Accordion.Header>
                        <Accordion.Body>
                            예, 그래픽 카드(GPU라고도 함)는 컴퓨터 시스템의 병목 현상이 될 수 있습니다. 병목 현상은 특정 구성 요소가 최대 용량으로 작동하고 시스템의 나머지 부분을 따라잡지 못해 전체 성능을 제한할 때 발생합니다.
                            그래픽 카드의 경우 GPU가 너무 약해서 시스템에서 실행 중인 게임이나 응용 프로그램의 요구 사항을 처리할 수 없는 경우 이런 일이 발생할 수 있습니다. 이로 인해 낮은 프레임 속도, 끊김 및 기타 성능 문제가 발생할 수 있습니다.
                            보다 강력한 GPU로 업그레이드하면 이러한 병목 현상을 완화하고 전반적인 성능을 향상하는 데 도움이 될 수 있습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>CPU 병목 현상이 발생하면 어떻게 되는가?</Accordion.Header>
                        <Accordion.Body>
                            CPU 병목 현상은 중앙 처리 장치(CPU)가 최대 용량으로 작동하고 시스템의 나머지 부분을 따라갈 수 없어 전체 성능을 제한할 때 발생합니다.
                            이는 게임 또는 기타 그래픽 집약적인 응용 프로그램의 낮은 프레임 속도, 느린 응용 프로그램 성능 및 응답성, 대용량 파일 또는 프로그램의 더 긴 로드 시간, 높은 CPU 사용률 및 온도를 포함하여 여러 가지 방식으로 나타날 수 있습니다.
                            CPU 병목 현상이 발생하면 약한 CPU, 메모리 부족 또는 느린 저장 장치를 비롯한 여러 요인으로 인해 발생할 수 있습니다.
                            이러한 경우 CPU를 더 강력한 것으로 업그레이드하거나 메모리 양을 늘리면 병목 현상을 완화하고 전반적인 성능을 향상하는 데 도움이 될 수 있습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>병목 현상 계산기는 완전히 정확한지?</Accordion.Header>
                        <Accordion.Body>
                            병목 현상 계산기는 컴퓨터 시스템에서 특정 구성 요소의 잠재적인 성능 영향을 추정하는 도구입니다.
                            그러나 이러한 계산기의 정확도는 벤치마크 결과의 차이, 실제 데이터 부족, 구성 요소 간의 복잡한 상호 작용과 같은 요인의 영향을 받을 수 있습니다.
                            따라서 이러한 계산기는 일반적인 지침으로 사용해야 하며 확정적인 답이 아닙니다. 보다 정확한 성능 표현을 위해 사용하려는 특정 구성 요소로 시스템을 테스트하는 것이 항상 가장 좋습니다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>병목 현상 계산기의 작동 원리</Accordion.Header>
                        <Accordion.Body>
                            병목 현상 계산기는 시스템 구성을 분석하고 이를 벤치마크 결과 데이터베이스와 비교하여 작동합니다. 그들은 이 정보를 사용하여 CPU 또는 GPU와 같은 특정 구성 요소의 성능 영향을 추정합니다.
                            계산은 시스템의 성능이 병목 현상으로 알려진 가장 느린 구성 요소에 의해 제한된다는 가정을 기반으로 합니다. 그런 다음 계산기는 병목 현상 구성 요소를 업그레이드하면 성능이 얼마나 향상될지 추정합니다.
                            그러나 앞에서 언급했듯이 실제 성능은 합성 벤치마크 결과와 다를 수 있고 시스템의 모든 구성 요소 간에 복잡한 상호 작용이 있기 때문에 이러한 예측이 항상 완전히 정확한 것은 아닙니다.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
}
export default HowToViewSpec;











