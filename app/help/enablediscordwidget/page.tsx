export default function EnableDiscordWidgetPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Enable Discord Server Widget</h1>
                <p className="text-gray-600 mt-1">Learn how to enable Discord server widgets to show member lists and channels on your community page</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> You need to be a server administrator or have the Manage Server permission to enable Discord server widgets.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Discord Server Widget?</h2>
              <p className="text-gray-700 mb-6">
                A Discord server widget is a feature that allows you to display your server information, member list, and channels on external websites. When enabled, it provides a rich preview of your Discord server that can be embedded on your community page.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Enable Discord Server Widget</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Open Server Settings</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Open Discord and navigate to your server</li>
                    <li>Click on the server name at the top of the channel list</li>
                    <li>Select Server Settings from the dropdown menu</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Navigate to Widget Settings</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>In the Server Settings menu, look for Widget in the left sidebar</li>
                    <li>Click on Widget to open the widget settings</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Enable the Widget</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Toggle the Enable Server Widget switch to ON</li>
                    <li>Choose which channel you want to display as the invite channel (optional)</li>
                    <li>Click Save Changes to apply the settings</li>
                  </ol>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 4: Verify Widget is Working</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>After enabling the widget, your community page should automatically update</li>
                    <li>You should now see member avatars, usernames, and channel lists</li>
                    <li>The widget refreshes every minute to show current online members</li>
                  </ol>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">What You Will See After Enabling</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Enhanced Discord Widget Features:</h3>
                  <ul className="list-disc list-inside space-y-2 text-green-700">
                    <li><strong>Server Profile Picture:</strong> Your Discord server actual icon will be displayed</li>
                    <li><strong>Member List:</strong> Shows up to 8 online members with their avatars and usernames</li>
                    <li><strong>Online Status:</strong> Color-coded indicators showing if members are online, idle, or busy</li>
                    <li><strong>Channel List:</strong> Displays up to 5 channels with # prefixes</li>
                    <li><strong>Real-time Updates:</strong> Member counts and online status update automatically</li>
                    <li><strong>Join Button:</strong> Direct link to join your Discord server</li>
                  </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Troubleshooting</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Common Issues:</h3>
                  <ul className="list-disc list-inside space-y-2 text-yellow-700">
                    <li><strong>Widget not showing:</strong> Make sure you have the Manage Server permission</li>
                    <li><strong>No member list:</strong> Ensure the widget is enabled and the server has members</li>
                    <li><strong>Missing channels:</strong> Check that your server has text channels (voice channels will not appear)</li>
                    <li><strong>Slow updates:</strong> The widget refreshes every 60 seconds, so changes may take a minute to appear</li>
                  </ul>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Help?</h3>
                <p className="text-gray-700 mb-4">
                  If you are still having trouble enabling the Discord widget, you can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Check Discord official documentation on server widgets</li>
                  <li>Contact Discord support if you do not have the required permissions</li>
                  <li>Ask your server administrator to enable the widget for you</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
