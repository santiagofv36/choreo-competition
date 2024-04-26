class PaginatedResponse:
    
    class Page:
        def __init__(self,**kwargs):
            self.hasNext   = kwargs["hasNext"]
            self.hasPrev   = kwargs["hasPrev"]
            self.content   = kwargs["content"]
            self.perPage   = kwargs["perPage"]
            self.pageCount = kwargs["pageCount"]
            self.page      = kwargs["page"]
            self.itemCount = kwargs["itemCount"]

        def as_json(self):
            return {"itemCount" : self.itemCount,
                    "page"      : self.page,
                    "hasNext"   : self.hasNext,
                    "hasPrev"   : self.hasPrev,
                    "perPage"   : self.perPage,
                    "pageCount" : self.pageCount,
                    "content"   : self.content,
                    }
 
    
    def __init__(self,**kwargs):
        self._query = kwargs["query"]
        self.count  = self._query.count()
        self.pagesize = kwargs["pagesize"]

        self.has_next = lambda page : (page*self.pagesize < self.count)
        self.has_prev = lambda page : (page>1)

    def get_paginated_results(self,**kwargs):
        page_number = kwargs["page"]
        page_count = self.count // self.pagesize
        offset = (page_number - 1) * self.pagesize
        results = self._query.offset(offset).limit(self.pagesize).all()
        
        page = self.Page(
            itemCount = self.count,
            page      = page_number,
            pageCount = page_count,
            hasNext   = self.has_next(page_number),
            hasPrev   = self.has_prev(page_number),
            content   = results,
            perPage   = self.pagesize
        )
        
        return page.as_json()
