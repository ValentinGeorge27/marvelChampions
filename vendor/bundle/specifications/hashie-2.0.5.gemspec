# -*- encoding: utf-8 -*-
# stub: hashie 2.0.5 ruby lib

Gem::Specification.new do |s|
  s.name = "hashie".freeze
  s.version = "2.0.5"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Michael Bleigh".freeze, "Jerry Cheung".freeze]
  s.date = "2013-05-10"
  s.description = "Hashie is a small collection of tools that make hashes more powerful. Currently includes Mash (Mocking Hash) and Dash (Discrete Hash).".freeze
  s.email = ["michael@intridea.com".freeze, "jollyjerry@gmail.com".freeze]
  s.homepage = "https://github.com/intridea/hashie".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.6.2".freeze
  s.summary = "Your friendly neighborhood hash toolkit.".freeze

  s.installed_by_version = "2.6.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>.freeze, ["~> 0.9.2"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 2.5"])
      s.add_development_dependency(%q<guard>.freeze, [">= 0"])
      s.add_development_dependency(%q<guard-rspec>.freeze, [">= 0"])
      s.add_development_dependency(%q<growl>.freeze, [">= 0"])
    else
      s.add_dependency(%q<rake>.freeze, ["~> 0.9.2"])
      s.add_dependency(%q<rspec>.freeze, ["~> 2.5"])
      s.add_dependency(%q<guard>.freeze, [">= 0"])
      s.add_dependency(%q<guard-rspec>.freeze, [">= 0"])
      s.add_dependency(%q<growl>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<rake>.freeze, ["~> 0.9.2"])
    s.add_dependency(%q<rspec>.freeze, ["~> 2.5"])
    s.add_dependency(%q<guard>.freeze, [">= 0"])
    s.add_dependency(%q<guard-rspec>.freeze, [">= 0"])
    s.add_dependency(%q<growl>.freeze, [">= 0"])
  end
end
