/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  MyERC1155Token,
  MyERC1155TokenInterface,
} from "../../../contracts/ERC1155Token.sol/MyERC1155Token";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "createToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060200160405280600081525062000033816200005160201b60201c565b506200004b60036200006660201b6200078c1760201c565b620003dd565b8060029081620000629190620002f6565b5050565b6001816000016000828254019250508190555050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620000fe57607f821691505b602082108103620001145762000113620000b6565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200017e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200013f565b6200018a86836200013f565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620001d7620001d1620001cb84620001a2565b620001ac565b620001a2565b9050919050565b6000819050919050565b620001f383620001b6565b6200020b6200020282620001de565b8484546200014c565b825550505050565b600090565b6200022262000213565b6200022f818484620001e8565b505050565b5b8181101562000257576200024b60008262000218565b60018101905062000235565b5050565b601f821115620002a65762000270816200011a565b6200027b846200012f565b810160208510156200028b578190505b620002a36200029a856200012f565b83018262000234565b50505b505050565b600082821c905092915050565b6000620002cb60001984600802620002ab565b1980831691505092915050565b6000620002e68383620002b8565b9150826002028217905092915050565b62000301826200007c565b67ffffffffffffffff8111156200031d576200031c62000087565b5b620003298254620000e5565b620003368282856200025b565b600060209050601f8311600181146200036e576000841562000359578287015190505b620003658582620002d8565b865550620003d5565b601f1984166200037e866200011a565b60005b82811015620003a85784890151825560018201915060208501945060208101905062000381565b86831015620003c85784890151620003c4601f891682620002b8565b8355505b6001600288020188555050505b505050505050565b6127d680620003ed6000396000f3fe608060405234801561001057600080fd5b50600436106100925760003560e01c80634e1273f4116100665780634e1273f4146101435780636a10d4d614610173578063a22cb465146101a3578063e985e9c5146101bf578063f242432a146101ef57610092565b8062fdd58e1461009757806301ffc9a7146100c75780630e89341c146100f75780632eb2c2d614610127575b600080fd5b6100b160048036038101906100ac91906115fd565b61020b565b6040516100be919061164c565b60405180910390f35b6100e160048036038101906100dc91906116bf565b6102d3565b6040516100ee9190611707565b60405180910390f35b610111600480360381019061010c9190611722565b6103b5565b60405161011e91906117df565b60405180910390f35b610141600480360381019061013c91906119fe565b610449565b005b61015d60048036038101906101589190611b90565b6104ea565b60405161016a9190611cc6565b60405180910390f35b61018d600480360381019061018891906115fd565b610603565b60405161019a919061164c565b60405180910390f35b6101bd60048036038101906101b89190611d14565b610641565b005b6101d960048036038101906101d49190611d54565b610657565b6040516101e69190611707565b60405180910390f35b61020960048036038101906102049190611d94565b6106eb565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361027b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027290611e9d565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061039e57507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806103ae57506103ad826107a2565b5b9050919050565b6060600280546103c490611eec565b80601f01602080910402602001604051908101604052809291908181526020018280546103f090611eec565b801561043d5780601f106104125761010080835404028352916020019161043d565b820191906000526020600020905b81548152906001019060200180831161042057829003601f168201915b50505050509050919050565b61045161080c565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061049757506104968561049161080c565b610657565b5b6104d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104cd90611f8f565b60405180910390fd5b6104e38585858585610814565b5050505050565b60608151835114610530576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052790612021565b60405180910390fd5b6000835167ffffffffffffffff81111561054d5761054c611806565b5b60405190808252806020026020018201604052801561057b5781602001602082028036833780820191505090505b50905060005b84518110156105f8576105c88582815181106105a05761059f612041565b5b60200260200101518583815181106105bb576105ba612041565b5b602002602001015161020b565b8282815181106105db576105da612041565b5b602002602001018181525050806105f19061209f565b9050610581565b508091505092915050565b6000806106106003610b35565b905061062d84828560405180602001604052806000815250610b43565b610637600361078c565b8091505092915050565b61065361064c61080c565b8383610cf3565b5050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6106f361080c565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061073957506107388561073361080c565b610657565b5b610778576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076f90611f8f565b60405180910390fd5b6107858585858585610e5f565b5050505050565b6001816000016000828254019250508190555050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b8151835114610858576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161084f90612159565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036108c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108be906121eb565b60405180910390fd5b60006108d161080c565b90506108e18187878787876110fa565b60005b8451811015610a9257600085828151811061090257610901612041565b5b60200260200101519050600085838151811061092157610920612041565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156109c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109b99061227d565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a77919061229d565b9250508190555050505080610a8b9061209f565b90506108e4565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610b099291906122d1565b60405180910390a4610b1f818787878787611102565b610b2d81878787878761110a565b505050505050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610bb2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba99061237a565b60405180910390fd5b6000610bbc61080c565b90506000610bc9856112e1565b90506000610bd6856112e1565b9050610be7836000898585896110fa565b8460008088815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c46919061229d565b925050819055508673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628989604051610cc492919061239a565b60405180910390a4610cdb83600089858589611102565b610cea8360008989898961135b565b50505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610d61576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5890612435565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610e529190611707565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610ece576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ec5906121eb565b60405180910390fd5b6000610ed861080c565b90506000610ee5856112e1565b90506000610ef2856112e1565b9050610f028389898585896110fa565b600080600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905085811015610f99576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f909061227d565b60405180910390fd5b85810360008089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508560008089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461104e919061229d565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a6040516110cb92919061239a565b60405180910390a46110e1848a8a86868a611102565b6110ef848a8a8a8a8a61135b565b505050505050505050565b505050505050565b505050505050565b6111298473ffffffffffffffffffffffffffffffffffffffff16611532565b156112d9578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161116f9594939291906124b9565b6020604051808303816000875af19250505080156111ab57506040513d601f19601f820116820180604052508101906111a89190612536565b60015b611250576111b7612570565b806308c379a00361121357506111cb612592565b806111d65750611215565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120a91906117df565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124790612694565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146112d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ce90612726565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff811115611300576112ff611806565b5b60405190808252806020026020018201604052801561132e5781602001602082028036833780820191505090505b509050828160008151811061134657611345612041565b5b60200260200101818152505080915050919050565b61137a8473ffffffffffffffffffffffffffffffffffffffff16611532565b1561152a578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016113c0959493929190612746565b6020604051808303816000875af19250505080156113fc57506040513d601f19601f820116820180604052508101906113f99190612536565b60015b6114a157611408612570565b806308c379a003611464575061141c612592565b806114275750611466565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161145b91906117df565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161149890612694565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611528576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151f90612726565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061159482611569565b9050919050565b6115a481611589565b81146115af57600080fd5b50565b6000813590506115c18161159b565b92915050565b6000819050919050565b6115da816115c7565b81146115e557600080fd5b50565b6000813590506115f7816115d1565b92915050565b600080604083850312156116145761161361155f565b5b6000611622858286016115b2565b9250506020611633858286016115e8565b9150509250929050565b611646816115c7565b82525050565b6000602082019050611661600083018461163d565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61169c81611667565b81146116a757600080fd5b50565b6000813590506116b981611693565b92915050565b6000602082840312156116d5576116d461155f565b5b60006116e3848285016116aa565b91505092915050565b60008115159050919050565b611701816116ec565b82525050565b600060208201905061171c60008301846116f8565b92915050565b6000602082840312156117385761173761155f565b5b6000611746848285016115e8565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561178957808201518184015260208101905061176e565b60008484015250505050565b6000601f19601f8301169050919050565b60006117b18261174f565b6117bb818561175a565b93506117cb81856020860161176b565b6117d481611795565b840191505092915050565b600060208201905081810360008301526117f981846117a6565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61183e82611795565b810181811067ffffffffffffffff8211171561185d5761185c611806565b5b80604052505050565b6000611870611555565b905061187c8282611835565b919050565b600067ffffffffffffffff82111561189c5761189b611806565b5b602082029050602081019050919050565b600080fd5b60006118c56118c084611881565b611866565b905080838252602082019050602084028301858111156118e8576118e76118ad565b5b835b8181101561191157806118fd88826115e8565b8452602084019350506020810190506118ea565b5050509392505050565b600082601f8301126119305761192f611801565b5b81356119408482602086016118b2565b91505092915050565b600080fd5b600067ffffffffffffffff82111561196957611968611806565b5b61197282611795565b9050602081019050919050565b82818337600083830152505050565b60006119a161199c8461194e565b611866565b9050828152602081018484840111156119bd576119bc611949565b5b6119c884828561197f565b509392505050565b600082601f8301126119e5576119e4611801565b5b81356119f584826020860161198e565b91505092915050565b600080600080600060a08688031215611a1a57611a1961155f565b5b6000611a28888289016115b2565b9550506020611a39888289016115b2565b945050604086013567ffffffffffffffff811115611a5a57611a59611564565b5b611a668882890161191b565b935050606086013567ffffffffffffffff811115611a8757611a86611564565b5b611a938882890161191b565b925050608086013567ffffffffffffffff811115611ab457611ab3611564565b5b611ac0888289016119d0565b9150509295509295909350565b600067ffffffffffffffff821115611ae857611ae7611806565b5b602082029050602081019050919050565b6000611b0c611b0784611acd565b611866565b90508083825260208201905060208402830185811115611b2f57611b2e6118ad565b5b835b81811015611b585780611b4488826115b2565b845260208401935050602081019050611b31565b5050509392505050565b600082601f830112611b7757611b76611801565b5b8135611b87848260208601611af9565b91505092915050565b60008060408385031215611ba757611ba661155f565b5b600083013567ffffffffffffffff811115611bc557611bc4611564565b5b611bd185828601611b62565b925050602083013567ffffffffffffffff811115611bf257611bf1611564565b5b611bfe8582860161191b565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611c3d816115c7565b82525050565b6000611c4f8383611c34565b60208301905092915050565b6000602082019050919050565b6000611c7382611c08565b611c7d8185611c13565b9350611c8883611c24565b8060005b83811015611cb9578151611ca08882611c43565b9750611cab83611c5b565b925050600181019050611c8c565b5085935050505092915050565b60006020820190508181036000830152611ce08184611c68565b905092915050565b611cf1816116ec565b8114611cfc57600080fd5b50565b600081359050611d0e81611ce8565b92915050565b60008060408385031215611d2b57611d2a61155f565b5b6000611d39858286016115b2565b9250506020611d4a85828601611cff565b9150509250929050565b60008060408385031215611d6b57611d6a61155f565b5b6000611d79858286016115b2565b9250506020611d8a858286016115b2565b9150509250929050565b600080600080600060a08688031215611db057611daf61155f565b5b6000611dbe888289016115b2565b9550506020611dcf888289016115b2565b9450506040611de0888289016115e8565b9350506060611df1888289016115e8565b925050608086013567ffffffffffffffff811115611e1257611e11611564565b5b611e1e888289016119d0565b9150509295509295909350565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b6000611e87602a8361175a565b9150611e9282611e2b565b604082019050919050565b60006020820190508181036000830152611eb681611e7a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611f0457607f821691505b602082108103611f1757611f16611ebd565b5b50919050565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206f7220617070726f766564000000000000000000000000000000000000602082015250565b6000611f79602e8361175a565b9150611f8482611f1d565b604082019050919050565b60006020820190508181036000830152611fa881611f6c565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b600061200b60298361175a565b915061201682611faf565b604082019050919050565b6000602082019050818103600083015261203a81611ffe565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006120aa826115c7565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036120dc576120db612070565b5b600182019050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b600061214360288361175a565b915061214e826120e7565b604082019050919050565b6000602082019050818103600083015261217281612136565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006121d560258361175a565b91506121e082612179565b604082019050919050565b60006020820190508181036000830152612204816121c8565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b6000612267602a8361175a565b91506122728261220b565b604082019050919050565b600060208201905081810360008301526122968161225a565b9050919050565b60006122a8826115c7565b91506122b3836115c7565b92508282019050808211156122cb576122ca612070565b5b92915050565b600060408201905081810360008301526122eb8185611c68565b905081810360208301526122ff8184611c68565b90509392505050565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600061236460218361175a565b915061236f82612308565b604082019050919050565b6000602082019050818103600083015261239381612357565b9050919050565b60006040820190506123af600083018561163d565b6123bc602083018461163d565b9392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b600061241f60298361175a565b915061242a826123c3565b604082019050919050565b6000602082019050818103600083015261244e81612412565b9050919050565b61245e81611589565b82525050565b600081519050919050565b600082825260208201905092915050565b600061248b82612464565b612495818561246f565b93506124a581856020860161176b565b6124ae81611795565b840191505092915050565b600060a0820190506124ce6000830188612455565b6124db6020830187612455565b81810360408301526124ed8186611c68565b905081810360608301526125018185611c68565b905081810360808301526125158184612480565b90509695505050505050565b60008151905061253081611693565b92915050565b60006020828403121561254c5761254b61155f565b5b600061255a84828501612521565b91505092915050565b60008160e01c9050919050565b600060033d111561258f5760046000803e61258c600051612563565b90505b90565b600060443d1061261f576125a4611555565b60043d036004823e80513d602482011167ffffffffffffffff821117156125cc57505061261f565b808201805167ffffffffffffffff8111156125ea575050505061261f565b80602083010160043d03850181111561260757505050505061261f565b61261682602001850186611835565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e2d4552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b600061267e60348361175a565b915061268982612622565b604082019050919050565b600060208201905081810360008301526126ad81612671565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b600061271060288361175a565b915061271b826126b4565b604082019050919050565b6000602082019050818103600083015261273f81612703565b9050919050565b600060a08201905061275b6000830188612455565b6127686020830187612455565b612775604083018661163d565b612782606083018561163d565b81810360808301526127948184612480565b9050969550505050505056fea2646970667358221220a154e24b52a7d292a51469cda4c49c191ad5687c236436ae9adb6cdbccf6fb5964736f6c63430008120033";

type MyERC1155TokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyERC1155TokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyERC1155Token__factory extends ContractFactory {
  constructor(...args: MyERC1155TokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MyERC1155Token & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MyERC1155Token__factory {
    return super.connect(runner) as MyERC1155Token__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyERC1155TokenInterface {
    return new Interface(_abi) as MyERC1155TokenInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MyERC1155Token {
    return new Contract(address, _abi, runner) as unknown as MyERC1155Token;
  }
}
