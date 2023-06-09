# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "PacoIrene"
  spec.version       = "0.2.3"
  spec.authors       = ["Mark Chu"]

  spec.summary       = %q{Mark Chu}
  spec.homepage      = "https://pacoirene.github.io/"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 4.0"
  spec.add_runtime_dependency "jekyll-paginate-v2", "~> 3.0"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.5"

  spec.add_development_dependency "bundler", "~> 2.0"
  spec.add_development_dependency "rake", "~> 12.3.3"
end
