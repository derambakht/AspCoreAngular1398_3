using System;
using System.Collections.Generic;
using System.Text;

namespace ViewModels.AccessRight
{
    public class MenuItemViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public int ParentId { get; set; }
        public bool IsActive { get; set; }

        public List<MenuItemViewModel> Children { get; set; } = new List<MenuItemViewModel>();
    }
}
