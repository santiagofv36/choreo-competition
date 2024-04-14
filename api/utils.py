class PaginatedResponse:
    
    class Page:
        def __init__(self,**kwargs):
            self.hasNext   = kwargs["hasNext"]
            self.hasPrev   = kwargs["hasPrev"]
            self.content   = kwargs["content"]
            self.perPage   = kwargs["perPage"]
            self.pageCount = kwargs["pageCount"]

        def as_json(self):
            return {"hasNext"   : self.hasNext,
                    "hasPrev"   : self.hasPrev,
                    "content"   : self.content,
                    "perPage"   : self.perPage,
                    "pageCount" : self.pageCount
                    }
 
    
    def __init__(self,**kwargs):
        self._query = kwargs["query"]
        self.count  = self._query.count()
        self.pagesize = kwargs["pagesize"]

        self.has_next = lambda page : (page*self.pagesize < self.count)
        self.has_prev = lambda page : (page>1)

    def get_paginated_results(self,**kwargs):
        page_number = kwargs["page"]
        offset = (page_number - 1) * self.pagesize
        results = self._query.offset(offset).limit(self.pagesize).all()
        
        page = self.Page(
            pageCount = page_number,
            hasNext   = self.has_next(page_number),
            hasPrev   = self.has_prev(page_number),
            content   = results,
            perPage   = self.pagesize
        )
        
        return page.as_json()
