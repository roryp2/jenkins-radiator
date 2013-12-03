require 'sinatra/base'
require 'net/http'
require 'json'

module JenkinsRadiator

  class App < Sinatra::Base
    set :root, File.dirname(__FILE__)
    set :views, Proc.new { File.join root, 'views' }
    set :public_folder, Proc.new { File.join root, 'public' }

    get '/' do
      File.read File.join('public/views', 'index.html')
    end

    get '/jenkins' do
      callback = params['jsonp']
      uri = URI(URI::encode(params['server']))

      content_type 'application/javascript'
      response.headers['Connection'] = 'Keep-Alive'
      response.headers['Keep-Alive'] = 'timeout=5, max=88'

      "#{callback}(#{JSON.parse(Net::HTTP.get(uri)).to_json})"
    end
  end
end