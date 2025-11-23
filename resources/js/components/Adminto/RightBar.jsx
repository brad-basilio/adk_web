import React from 'react'
import { Local } from 'sode-extend-react'

const RigthBar = () => {

  const settings = Local.get('adminto_settings') ?? { menuColor: 'gradient' }

  // Theme
  const bsLight = document.getElementById('bs-default-stylesheet')
  const bsDark = document.getElementById('bs-dark-stylesheet')

  const appLight = document.getElementById('app-default-stylesheet')
  const appDark = document.getElementById('app-dark-stylesheet')

  const dgLight = document.getElementById('dg-default-stylesheet')
  const dgDark = document.getElementById('dg-dark-stylesheet')

  if (settings.theme == 'dark') {
    bsDark.disabled = false
    appDark.disabled = false
    dgDark.disabled = false

    bsLight.disabled = true
    appLight.disabled = true
    dgLight.disabled = true
  } else {
    bsLight.disabled = false
    appLight.disabled = false
    dgLight.disabled = false

    bsDark.disabled = true
    appDark.disabled = true
    dgDark.disabled = true
  }

  const body = document.body

  // Width
  body.setAttribute('data-layout-width', settings.width ?? 'fluid')
  // Menu position
  body.setAttribute('data-layout-menu-position', settings.menuPosition ?? 'fixed')
  // Menu color
  body.setAttribute('data-sidebar-color', settings.menuColor ?? 'light')
  // User info
  body.setAttribute('data-sidebar-showuser', settings.userInfo ?? true)
  // Menu size
  body.setAttribute('data-sidebar-size', settings.menuSize ?? 'default')
  // Navbar color
  body.setAttribute('data-topbar-color', settings.navbarColor ?? 'light')

  return (<div className="right-bar">

    <div data-simplebar className="h-100">

      <div className="rightbar-title">
        <a href="#" className="right-bar-toggle float-end">
          <i className="mdi mdi-close"></i>
        </a>
        <h4 className="font-16 m-0 text-white">Theme Settings</h4>
      </div>
      <div className="tab-content pt-0">

        <div className="tab-pane active" id="settings-tab" role="tabpanel">

          <div className="p-3">
            <div className="alert alert-warning" role="alert">
              <strong>Customize </strong> the theme, menu, top bar, etc.
            </div>

            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Main Theme</h6>
            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="color-scheme-mode"
                id="light-mode-check" defaultChecked={settings.theme == 'dark'} />
              <label className="form-check-label" htmlFor="light-mode-check">{settings.theme == 'dark' ? 'Dark Mode' : 'Light Mode'}</label>
            </div>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Window Width</h6>
            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="width" id="fluid-check"
                defaultChecked={settings.width == 'boxed'} />
              <label className="form-check-label" htmlFor="fluid-check">{settings.width == 'boxed' ? 'Boxed' : 'Fluid'}</label>
            </div>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Menu and Navbar Position</h6>

            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="menus-position"
                id="fixed-check" defaultChecked={settings.menuPosition == 'scrollable'} />
              <label className="form-check-label" htmlFor="fixed-check">{settings.menuPosition == 'scrollable' ? 'Scrollable' : 'Fixed'}</label>
            </div>

            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Menu Color</h6>

            <div className="form-check form-switch mb-1">
              <input type="radio" className="form-check-input" name="leftsidebar-color" value="light"
                id="light-check" defaultChecked={!settings.menuColor || settings.menuColor == 'light'} />
              <label className="form-check-label" htmlFor="light-check">Light</label>
            </div>

            <div className="form-check form-switch mb-1">
              <input type="radio" className="form-check-input" name="leftsidebar-color" value="dark"
                id="dark-check" defaultChecked={settings.menuColor == 'dark'} />
              <label className="form-check-label" htmlFor="dark-check">Dark</label>
            </div>

            <div className="form-check form-switch mb-1">
              <input type="radio" className="form-check-input" name="leftsidebar-color" value="brand"
                id="brand-check" defaultChecked={settings.menuColor == 'brand'} />
              <label className="form-check-label" htmlFor="brand-check">Brand</label>
            </div>

            <div className="form-check form-switch mb-3">
              <input type="radio" className="form-check-input" name="leftsidebar-color" value="gradient"
                id="gradient-check" defaultChecked={settings.menuColor == 'gradient'} />
              <label className="form-check-label" htmlFor="gradient-check">Gradient</label>
            </div>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Menu Size</h6>

            <div className="form-check form-switch mb-1">
              <input type="radio" className="form-check-input" name="leftsidebar-size" value="default"
                id="default-size-check" defaultChecked={!settings.menuSize || settings.menuSize == 'default'} />
              <label className="form-check-label" htmlFor="default-size-check">Default</label>
            </div>

            <div className="form-check form-switch mb-1">
              <input type="radio" className="form-check-input" name="leftsidebar-size" value="condensed"
                id="condensed-check" defaultChecked={settings.menuSize == 'condensed'} />
              <label className="form-check-label" htmlFor="condensed-check">Condensed <small>(Extra small size)</small></label>
            </div>

            <div className="form-check form-switch mb-1">
              <input type="radio" className="form-check-input" name="leftsidebar-size" value="compact"
                id="compact-check" defaultChecked={settings.menuSize == 'compact'} />
              <label className="form-check-label" htmlFor="compact-check">Compact <small>(Small size)</small></label>
            </div>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">User Information (Menu)</h6>

            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="leftsidebar-user" value="fixed"
                id="sidebaruser-check" defaultChecked={settings.userInfo != false} />
              <label className="form-check-label" htmlFor="sidebaruser-check">{settings.userInfo == 'false' ? 'Hide' : 'Show'}</label>
            </div>
            <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Top Bar Color</h6>

            <div className="form-check form-switch mb-1">
              <input type="checkbox" className="form-check-input" name="topbar-color" value="dark"
                id="darktopbar-check" defaultChecked={settings.navbarColor == 'dark'} />
              <label className="form-check-label" htmlFor="darktopbar-check">{settings.navbarColor == 'dark' ? 'Dark' : 'Match Body'}</label>
            </div>

            <div className="d-grid mt-4">
              <button className="btn btn-primary" id="resetBtn">Reset</button>
              {/* <a href="https://1.envato.market/admintoadmin" className="btn btn-danger mt-3"
                target="_blank"><i className="mdi mdi-basket me-1"></i> Purchase Now</a> */}
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>)
}

export default RigthBar