using System;
using System.Collections.Generic;
using System.Text;

namespace ViewModels.Common
{
    public class GridQueryModel
    {
        public string Entity { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
        public SortModel[] Sorted { get; set; }
        public FilterModel[] Filtered { get; set; }
    }

    public class FilterModel
    {
        public string id { get; set; }
        public string value { get; set; }
    }

    public class SortModel
    {
        public string id { get; set; }
        public bool desc { get; set; } = false;
    }
}
