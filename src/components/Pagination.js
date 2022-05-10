import React from "react";
import styled from "styled-components";

import { Flex,Button } from "../elements/index";

function Pagination({total, limit, page, setPage}) {
    
    const numPages = Math.ceil(total / limit);
    return (
        <>
            <Flex styles={{gap:"20px", margin:"16px"}}>
                <Button _onClick={() => setPage(page - 1)} _disabled={page === 1}>
                    &lt;
                </Button>
                {Array(numPages)
                    .fill()
                    .map((v,i) => (
                        <PaginationBtn
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}
                        >
                            {i + 1}
                        </PaginationBtn>
                    ))}
                <Button _onClick={() => setPage(page + 1)} _disabled={page === numPages}>
                    &gt;
                </Button>
            </Flex>
        </>
    )
}

const PaginationBtn = styled.button`
    border: none;
    border-radius: 50%;
    width:25px;
    height:25px;
    padding: 3px;
    margin: 0;
    background: white;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    &[aria-current] {
    background: #FFA877;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    }
`;

export default Pagination;