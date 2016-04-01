# -*- encoding: utf-8 -*-
# stub: marvelite 0.1.3 ruby lib

Gem::Specification.new do |s|
  s.name = "marvelite".freeze
  s.version = "0.1.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Antonio Antillon".freeze]
  s.date = "2014-07-25"
  s.description = "Simple wrapper around the Marvel Comics API".freeze
  s.email = ["antillas21@gmail.com".freeze]
  s.homepage = "".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.2".freeze)
  s.rubygems_version = "2.6.2".freeze
  s.summary = "Simple wrapper around the Marvel Comics API".freeze

  s.installed_by_version = "2.6.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<httparty>.freeze, ["~> 0.12.0"])
      s.add_runtime_dependency(%q<hashie>.freeze, ["~> 2.0.5"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.3"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<pry>.freeze, [">= 0"])
      s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
      s.add_development_dependency(%q<fakeweb>.freeze, ["~> 1.3"])
    else
      s.add_dependency(%q<httparty>.freeze, ["~> 0.12.0"])
      s.add_dependency(%q<hashie>.freeze, ["~> 2.0.5"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.3"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<pry>.freeze, [">= 0"])
      s.add_dependency(%q<rspec>.freeze, [">= 0"])
      s.add_dependency(%q<fakeweb>.freeze, ["~> 1.3"])
    end
  else
    s.add_dependency(%q<httparty>.freeze, ["~> 0.12.0"])
    s.add_dependency(%q<hashie>.freeze, ["~> 2.0.5"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.3"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<pry>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
    s.add_dependency(%q<fakeweb>.freeze, ["~> 1.3"])
  end
end
