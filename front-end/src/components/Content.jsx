import styled from 'styled-components';
import { Input, Button, notification } from 'antd';

import bgimg from "../res/couple.jpg";
import { useEffect, useState } from 'react';

import { useDappContext } from '../store/contextProvider';


const WD = styled.div`
    padding: 4em;
  background: url(${bgimg});

`;

const Title = styled.h1`
  font-size: 1em;
  text-align: center;
  color: palevioletred;
`;

const List = styled.ul`
`

export default function Content() {

    const [appName, setAppName] = useState('');
    const [appDesc, setAppDesc] = useState('');
    const [appAbi, setAppAbi] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [networkName, setNetworkName] = useState('');

    const {dispatch} = useDappContext();

    useEffect(() => {
    }, [])


    const onNameChange = (e) => {
        setAppName(e.target.value);
    }

    const onDescChange = (e) => {
        setAppDesc(e.target.value);
    }

    const onAbiChange = (e) => {
        setAppAbi(e.target.value);
    }

    const onAddressChange = (e) => {
        setContractAddress(e.target.value);
    }

    const onNetworkNameChange = (e) => {
        setNetworkName(e.target.value);
    }

    const saveApp = () => {
        if ('undefined' === typeof window.ethereum) {
            console.log('Not installed!')

            notification.open({
                message: 'WTF?',
                description:
                    'Metamask is not installed. Please go to hell and download metamask before you come back.',
                onClick: () => {
                    console.log('Metamask not installed!');
                },
            });
            return;
        }

        //TODO: check data
        dispatch({payload: {
            appName,
            appDesc,
            appAbi,
            appNetwork: networkName,
            appAddress: contractAddress,
        }})
    }

    return <WD>
        <Title>My OneClickApp:</Title>
        <List>
            <li>
                <div>Name</div>
                <div><Input placeholder="My awesome Dapp" value={appName} onChange={onNameChange} /></div>
            </li>
            <li>
                <div>Descripton</div>
                <div><Input placeholder="The description of dapp" value={appDesc} onChange={onDescChange} /></div>
            </li>
            <li>
                <div>Abi</div>
                <div><Input placeholder="[]" value={appAbi} onChange={onAbiChange} /></div>
            </li>
            <li>
                <div>Contract Address</div>
                <div><Input placeholder="0x" value={contractAddress} onChange={onAddressChange} /></div>
            </li>
            <li>
                <div>Network Name</div>
                <div>Use "homestead" for ethereum mainnet. Leave blank for a custom network.</div>
                <div><Input placeholder="goerli" value={networkName} onChange={onNetworkNameChange} /></div>
            </li>
        </List>
        <Button type='primary' onClick={() => saveApp()}>Save</Button>
    </WD>
}