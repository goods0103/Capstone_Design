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
                <Accordion defaultActiveKey={['0']} alwaysOpen >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>사이트의 목적</Accordion.Header>
                        <Accordion.Body>
                            사용자의 컴퓨터 스펙(CPU, GPU, RAM) 정보를 자동으로 가져와 알려주고, 다른 제품들과 비교하여 수준을 파악할 수 있으며,
                            사용자가 궁금한 제품을 직접 선택하여 확인할 수도 있다. CPU와 GPU 간의 병목 현상 여부를 확인할 수 있고 그에 맞는 업그레이드할 제품을 추천해주기도 한다.
                            또한 자신의 스펙 또는 선택한 스펙으로 실행 가능한 게임을 확인할 수 있다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>내 스펙 불러오는법</Accordion.Header>
                        <Accordion.Body>
                            사이트 첫 화면에 있는 Get My Spec 버튼을 누르면 다운로드 창으로 넘어가게 된다. 그곳에서 download 버튼을 누르면 실행 파일이 다운로드 되는데 그 파일을 실행하여
                            본인 컴퓨터의 스펙을 불러오게 된다. CPU, GPU, RAM 카테고리에서는 본인의 스펙과 비슷한 스펙의 정보를 보여주고 각각의 부품 정보를 눌러 해당 부품의 상세 정보를 볼 수 있다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>원하는 스펙 입력</Accordion.Header>
                        <Accordion.Body>
                            사이트 첫 화면에 있는 Insert Spec 버튼을 누르면 원하는 CPU, GPU, RAM 정보를 입력할 수 있다. 각각의 스펙을 입력하고 submit 버튼을 누르면 사용자가 고른 스펙에 대한
                            정보를 볼 수 있고 그 스펙에 대한 병목현상을 간략하게 볼 수도 있다. 스펙을 입력한 상태에서도 CPU, GPU, RAM 카테고리에서는 사용자가 선택한 스펙과 비슷한 스펙의 부품 정보를
                            보여준다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>병목현상(BottleNeck)</Accordion.Header>
                        <Accordion.Body>
                            병목현상 카테고리에서는 원하는 CPU, GPU 부품 정보를 입력하여 둘 사이의 병목현상을 자세히 보여준다. 두 부품 사이에 몇 %의 병목현상이 존재하고 이것이 CPU 문제인지, GPU 문제인지
                            나타내 주어 문제점을 파악하고 더 나은 경험을 위한 해결책을 차트를 통해 제시해 준다.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>게임</Accordion.Header>
                        <Accordion.Body>
                            게임 카테고리에서는 사용자 스펙에 대한 해당 게임의 적합성을 나타내 준다. 원하는 게임을 검색하여 고르면 해당 게임의 최소사양과 권장사양을 나타내주고 사용자가 불러온 스펙과 비교하여 게임이
                            잘 돌아가는지 여부를 표시해 주어 한눈에 파악할 수 있다.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    );
}
export default HowToViewSpec;











