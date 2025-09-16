
const Dashboard = () => {
  return (
    <div>
    <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Add Property
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded-lg">
                Generate Report
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-gray-500">Monthly Revenue</p>
              <h3 className="text-2xl font-bold">$206,400</h3>
              <span className="text-green-500 text-sm">+12.5%</span>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-gray-500">Properties</p>
              <h3 className="text-2xl font-bold">4</h3>
              <span className="text-green-500 text-sm">+2</span>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-gray-500">Active Tenants</p>
              <h3 className="text-2xl font-bold">2</h3>
              <span className="text-green-500 text-sm">+5.2%</span>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-gray-500">Occupancy Rate</p>
              <h3 className="text-2xl font-bold">90.3%</h3>
              <span className="text-red-500 text-sm">-2.1%</span>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Dashboard
