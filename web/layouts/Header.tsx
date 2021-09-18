import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-xl shadow">
        <div className="container">
          <a href="https://pandapro.demo.nicetheme.xyz/" rel="home" className="logo navbar-brand order-2 order-xl-1">
            <img
              src="https://pandapro.demo.nicetheme.xyz/wp-content/themes/PandaPRO/images/logo.png"
              className="d-inline-block logo-light nc-no-lazy"
              alt="PandaPRO主题"
            />
            <img
              src="https://pandapro.demo.nicetheme.xyz/wp-content/themes/PandaPRO/images/logo-dark.png"
              className="d-none logo-dark nc-no-lazy"
              alt="PandaPRO主题"
            />
          </a>
          <button
            className="btn btn-link btn-icon btn-sm rounded-circle navbar-toggler order-1"
            type="button"
            id="sidebarCollapse"
          >
            <span>
              <i className="text-xl iconfont icon-menu"></i>
            </span>
          </button>
          <button
            className="btn btn-link btn-icon btn-sm rounded-circle navbar-toggler nav-search order-3 collapsed"
            data-bs-target="#navbar-search"
            data-bs-toggle="collapse"
            aria-expanded="false"
            aria-controls="navbar-search"
          >
            <span>
              <i className="text-xl iconfont icon-search"></i> <i className="text-xl iconfont icon-close"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse order-xl-2">
            <ul className="navbar-nav main-menu ms-4 me-auto">
              <li
                id="menu-item-165"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-165"
              >
                <a href="https://pandapro.demo.nicetheme.xyz/">首页</a>
              </li>
              <li
                id="menu-item-146"
                className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-146"
              >
                <a href="https://pandapro.demo.nicetheme.xyz/category/wanwu">玩物志趣</a>
              </li>
              <li
                id="menu-item-145"
                className="menu-item menu-item-type-taxonomy menu-item-object-category current-menu-item menu-item-145"
              >
                <a href="https://pandapro.demo.nicetheme.xyz/category/qianyankeji" aria-current="page">
                  前沿科技
                </a>
              </li>
              <li
                id="menu-item-144"
                className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-144"
              >
                <a href="https://pandapro.demo.nicetheme.xyz/category/chechuxing">车与出行</a>
              </li>
              <li id="menu-item-154" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-154">
                <a href="https://pandapro.demo.nicetheme.xyz/lanmu">精选栏目</a>
              </li>
              <li
                id="menu-item-147"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-147"
              >
                <span className="icon-sub-menu">
                  <i className="iconfont icon-jiantou1"></i>
                </span>
                <a href="https://pandapro.demo.nicetheme.xyz/sample-page-2">示例页面</a>
                <ul className="sub-menu">
                  <li
                    id="menu-item-153"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"
                  >
                    <a href="https://pandapro.demo.nicetheme.xyz/links">合作单位</a>
                  </li>
                </ul>
              </li>
              <li id="menu-item-152" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-152">
                <a target="_blank" rel="noopener noreferrer" href="https://www.nicetheme.cn/store/pandapro">
                  购买主题
                </a>
              </li>
            </ul>
            <ul className="navbar-nav align-items-center">
              <li className="nav-item ms-2 ms-md-3">
                <a href="javascript:" className="btn btn-link btn-icon btn-sm rounded-circle switch-dark-mode">
                  <span className="icon-light-mode">
                    <i className="text-md iconfont icon-bulb"></i>
                  </span>
                  <span className="icon-dark-mode">
                    <i className="text-md text-warning iconfont icon-bulb-fill"></i>
                  </span>
                </a>
              </li>
              <li className="nav-item ms-2 ms-md-3">
                <button
                  className="btn btn-link btn-icon btn-sm rounded-circle nav-search collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar-search"
                  aria-expanded="false"
                  aria-controls="navbar-search"
                >
                  <span>
                    <i className="text-md iconfont icon-search"></i> <i className="text-md iconfont icon-close"></i>
                  </span>
                </button>
              </li>
              <div className="nav-item ms-md-3 me-2">
                <a
                  className="btn btn-primary btn-sm btn-rounded"
                  href="https://pandapro.demo.nicetheme.xyz/wp-login.php"
                >
                  登录
                </a>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mobile-sidebar">
        <div className="mobile-sidebar-inner">
          <div className="mobile-sidebar-header canreg">
            <div className="mobile-sidebar-author-cover">
              <div className="media media-2x1">
                <div
                  className="media-content"
                  style={{
                    backgroundImage:
                      "url('https://pandapro.demo.nicetheme.xyz/wp-content/uploads/2020/12/2020122017025952.jpg')",
                  }}
                ></div>
                <div className="media-overlay overlay-top p-2">
                  <div className="flex-fill"></div>
                  <button type="button" className="btn btn-text btn-icon switch-dark-mode">
                    <span className="icon-light-mode">
                      <i className="iconfont icon-night-circle-fill "></i>
                    </span>
                    <span className="icon-dark-mode">
                      <i className="text-warning iconfont icon-night-circle-fill "></i>
                    </span>
                  </button>
                  <button type="button" className="btn btn-text btn-icon text-white sidebar-close">
                    <span>
                      <i className="iconfont icon-close-circle-fill"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mobile-sidebar-author-body">
              <div className="mobile-sidebar-author-meta py-4">
                <a
                  href="https://pandapro.demo.nicetheme.xyz/wp-login.php"
                  className="btn btn-primary btn-sm btn-rounded"
                >
                  立即登录
                </a>
              </div>
            </div>
          </div>
          <div className="mobile-sidebar-menu">
            <ul className="mobile-menu-inner">
              <li
                id="menu-item-160"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-160"
              >
                <a href="https://pandapro.demo.nicetheme.xyz/">首页</a>
              </li>
              <li
                id="menu-item-151"
                className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-151"
              >
                <a href="#">
                  栏目
                  <div className="dropdown-sub-menu">
                    <span className="iconfont icon-right"></span>
                  </div>
                </a>
                <ul className="sub-menu" style={{ display: 'block' }}>
                  <li
                    id="menu-item-148"
                    className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-148"
                  >
                    <a href="https://pandapro.demo.nicetheme.xyz/category/chechuxing">车与出行</a>
                  </li>
                  <li
                    id="menu-item-149"
                    className="menu-item menu-item-type-taxonomy menu-item-object-category current-menu-item menu-item-149"
                  >
                    <a href="https://pandapro.demo.nicetheme.xyz/category/qianyankeji" aria-current="page">
                      前沿科技
                    </a>
                  </li>
                  <li
                    id="menu-item-150"
                    className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-150"
                  >
                    <a href="https://pandapro.demo.nicetheme.xyz/category/wanwu">玩物志趣</a>
                  </li>
                </ul>
              </li>
              <li
                id="menu-item-155"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-155"
              >
                <a href="https://cosy.demo.nicetheme.xyz/">
                  页面
                  <div className="dropdown-sub-menu">
                    <span className="iconfont icon-right"></span>
                  </div>
                </a>
                <ul className="sub-menu">
                  <li
                    id="menu-item-156"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-156"
                  >
                    <a href="https://pandapro.demo.nicetheme.xyz/links">合作单位</a>
                  </li>
                  <li
                    id="menu-item-158"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-158"
                  >
                    <a href="https://pandapro.demo.nicetheme.xyz/lanmu">精选栏目</a>
                  </li>
                  <li
                    id="menu-item-157"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-157"
                  >
                    <a href="https://pandapro.demo.nicetheme.xyz/sample-page-2">示例页面</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="py-5"></div>
        </div>
      </div>
      <div className="navbar-search collapse " id="navbar-search">
        <div className="container">
          <form method="get" role="search" id="searchform" action="https://pandapro.demo.nicetheme.xyz/">
            <div className="search-form">
              <input
                type="text"
                className="search-input form-control form-control-lg"
                name="s"
                id="s"
                placeholder="请输入搜索关键词并按回车键…"
              />
              <i className="search-toggle text-md iconfont icon-search"></i>
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header
