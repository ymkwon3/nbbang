import React from "react";

import { Flex,Button } from "../elements/index";

function Pagination({total, limit, page, setPage}) {
    
    const numPages = Math.ceil(total / limit);
    return (
        <>
            <Flex styles={{gap:"4px", margin:"16px"}}>
                <Button _onClick={() => setPage(page - 1)} disabled={page === 1}>
                    전으로가요
                </Button>
                {Array(numPages)
                    .fill()
                    .map((v,i) => (
                        <Button
                            key={i + 1}
                            _onClick={() => setPage(i + 1)}
                            // aria-current={page === i + 1 ? "page" : null}
                        >
                            {i + 1}
                        </Button>
                    ))}
                <Button _onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    다음으로가요
                </Button>
            </Flex>
        </>
    )
}

export default Pagination;