// src/Components/ServiceDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import serviceData from '../data/ServiceData'; // Import your service data
import { openContractCall } from '@stacks/connect';
import { StacksMocknet } from '@stacks/network';
import { standardPrincipal } from '@stacks/transactions/dist/cl';
import { callReadOnlyFunction } from '@stacks/transactions';
import { userSession } from './UserSession';
const ServiceDetails = (service_id) => {
  const { title } = useParams();
  const service = serviceData.find((s) => s.title === title);
  if (!service) {
    // Handle the case when the service is not found
    return <div>Service not found</div>;
  }
   async function Check_Access() {
    const network= new StacksMocknet();
    const senderAddress = userSession.loadUserData().profile.stxAddress.testnet;
    const contractAddress='ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    const contractName='drive'
    const functionName='get-balance'
    const cSenderAddress=standardPrincipal(senderAddress);
  
    const options = {
      contractAddress,
      contractName,
      functionName,
      functionArgs: [cSenderAddress],
      network,
      senderAddress,
    };
  
    const result = await callReadOnlyFunction(options);
   const amount=parseInt(result.value.value);
    if(amount<500){
      alert("You don't have acess!!")
      return false
    }
    else if(amount>=500 && title=="Barber"){
      alert("access");
      return true
    }
    else if(amount>500 && amount<=1000 && (title=="Restaurant" || title=="Jewellery")){
      alert("access");
      return true;
    }
    else if(amount>1000 && (title=="Coffee Shop" || title=="Gym")){
      alert("access");
      return true;
    }
    else{
      alert('Not access');
      return false;
    }

  }

  

 


  return (
    <div className="service-details-container">
      <div className="photo-section">
        <img src={service.imageUrl} alt={service.title} />
      </div>
      <div className="details-section">
        <h2>{service.title}</h2>
        <p>{service.body}</p>
        <button onClick={()=>Check_Access()}>Get Access</button>
        {/* <ContractCallVote/> */}
      </div>
    </div>
  );
};

export default ServiceDetails;
