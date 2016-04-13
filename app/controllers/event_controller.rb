class EventController < WebsocketRails::BaseController
  skip_before_action :authenticate!

  before_filter :only => :new_notification do
    puts 'new_event was called'
  end

  def new_notification
    puts 'test'
  end

end